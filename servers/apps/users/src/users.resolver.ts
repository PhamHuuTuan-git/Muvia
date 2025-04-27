import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { RegisterReponse, ActivationResponse, LoginResponse, RefreshTokenResponse } from "./types/user.type";
import { RegisterDto, ActivationDto, LoginDto } from "./dto/user.dto";
import { BadRequestException, UseGuards } from "@nestjs/common";
import { Request, Response } from 'express'; 
import { AuthGuard } from "./guards/auth.guard";
@Resolver()
export class UserResolver {
  constructor(
    private readonly usersService: UsersService
  ) { }

  // Register user
  @Mutation(() => RegisterReponse)
  async register(
    @Args('registerInput', { type: () => RegisterDto }) registerDto: RegisterDto,
    @Context() context: { res: Response }
  ): Promise<RegisterReponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }
    // Gọi service xử lý logic đăng ký user
    const { activation_token } = await this.usersService.register(registerDto, context.res);
    return { activation_token };
  }

  // Activate account
  @Mutation(() => ActivationResponse)
  async activateUser(
    @Args('activationInput') activationDto: ActivationDto,
    @Context() context: { res: Response }

  ): Promise<ActivationResponse> {
    return await this.usersService.activateUser(activationDto, context.res);
  }

  // Login user
  @Mutation(() => LoginResponse)
  async login(
    @Args("loginInput") loginDto: LoginDto,
    @Context() context: { res: Response }
  ): Promise<LoginResponse> {
    const result = await this.usersService.login(loginDto, context.res);
    context.res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });
    return result;
  }

  // Refresh Token
  @Mutation(() => RefreshTokenResponse)
  async refreshToken(
    @Context() context: { req: Request; res: Response }
  ): Promise<RefreshTokenResponse> {
     return await this.usersService.refreshToken(context.req, context.res);
  }

  // Logout User
  @Mutation(() => Boolean)
  async logout(
    @Context() context: { res: Response }
  ): Promise<Boolean> {
    return this.usersService.logout(context.res);
  }


  // test
  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async test(
    @Args("id") userId :string,
    @Context() context: { res: Response }
  ): Promise<String> {
    return this.usersService.test(context.res);
  }

  // Default query
  @Query(() => String)
  helloMovie() {
    return this.usersService.getHello();
  }
}
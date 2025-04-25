import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { RegisterReponse, ActivationResponse } from "./types/user.type";
import { RegisterDto, ActivationDto } from "./dto/user.dto";
import { BadRequestException, UseGuards } from "@nestjs/common";

@Resolver()
export class UserResolver {
  constructor(
    private readonly usersService: UsersService
  ) { }

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

  @Mutation(() => ActivationResponse)
  async activateUser(
    @Args('activationInput') activationDto: ActivationDto,
    @Context() context: { res: Response }

  ): Promise<ActivationResponse> {
    return await this.usersService.activateUser(activationDto, context.res);
  }

  @Query(() => String)
  helloMovie() {
    return this.usersService.getHello();
  }
}
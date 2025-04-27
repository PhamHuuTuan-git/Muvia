import { Injectable } from '@nestjs/common';
import { MyJwtService } from './jwt.service';
import { PrismaService } from 'apps/users/prisma/prisma.service';
import { RegisterDto } from './dto/user.dto';
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { ConfigService } from '@nestjs/config';
import { ActivationDto } from './dto/user.dto';
import { Response, Request } from 'express';
@Injectable()
export class UsersService {

  constructor(
    private readonly jwtService: MyJwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService

  ) { }
  getHello(): string {
    return 'Hello World User!';
  }

  // register user
  async register(register: RegisterDto, response: Response) {
    const { name, email, password, rePassword } = register;

    if (password !== rePassword) throw new BadRequestException("Confirm password have to match with password");

    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (isEmailExist) {
      throw new BadRequestException("User already exist with this email!")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      password: hashedPassword,
      avatar: {
        url: "https://png.pngtree.com/png-clipart/20241125/original/pngtree-cartoon-user-avatar-vector-png-image_17295195.png",
        imgId: ""
      }
    }

    const activationToken = await this.jwtService.createActivationToken({ name, email });
    const activationCode = activationToken.activationCode;

    await this.prisma.user.create({
      data: user
    })

    await this.emailService.sendMail({
      email,
      subject: "Activate your email",
      template: "./activation-mail",
      name,
      activationCode,
    })

    const activation_token = `${activationToken.token}`;
    return { activation_token, response }
  }

  // activate user
  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationToken, activationCode } = activationDto;
    try {
      const newUser = this.jwtService.verify(activationToken, "ACTIVATION_SECRET")
      console.log("new user: ", newUser);
      if (newUser) {
        if (newUser.activationCode !== activationCode) {
          throw new BadRequestException('Invalid activation code');
        }

        // Find user with email
        const { email } = newUser.user;
        const existUser = await this.prisma.user.findUnique({
          where: {
            email
          }
        });

        console.log("user got: ", existUser);
        if (existUser && existUser.state === false) {
          const updatedUser = await this.prisma.user.update({
            where: {
              id: `${existUser.id}`
            },
            data: {
              state: true
            }
          })
          return {
            user: {
              id: updatedUser.id,
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role,
              avatar: updatedUser.avatar,
              state: updatedUser.state,
              updatedAt: updatedUser.updatedAt,
              createdAt: updatedUser.createdAt
            },
            response
          }
        } else if (existUser && existUser.state === true) {
          throw new BadRequestException("This user has been activated!")
        } else {
          throw new BadRequestException("Cannot find users with this email!");
        }
      } else {
        throw new BadRequestException("Cannot find user with this token");
      }
    } catch (err) {
      // console.log("Catched error: ", err);
      throw new BadRequestException(err);
    }


    // const newUser: { user: UserData, activationCode: string } = this.jwtService.verify(
    //   activationToken,
    //   {
    //     secret: this.configService.get<string>('ACTIVATION_SECRET')
    //   } as JwtVerifyOptions
    // ) as { user: UserData; activationCode: string }
    // if (newUser.activationCode !== activationCode) {
    //   throw new BadRequestException('Invalid activation code');
    // }
    // const { name, email, password, phone_number } = newUser.user;
    // const existUser = await this.prisma.user.findUnique({
    //   where: {
    //     email
    //   }
    // });
    // if (existUser) {
    //   throw new BadRequestException('User already exist with this email')
    // }
    // const user = await this.prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password,
    //   }
    // })
    // return { user, response }
  }

  // login user
  async login({ email, password }, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      })
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const accessToken = this.jwtService.generateAccessToken({ id: user.id });
          const refreshToken = this.jwtService.generateRefreshToken({ id: user.id });
          // res.cookie('refresh_token', refreshToken, {
          //   httpOnly: true, // 
          //   // secure: process.env.NODE_ENV === 'production',
          //   secure: false,
          //   sameSite: 'lax',  // Giúp ngăn CSRF 
          //   maxAge: 24 * 60 * 60 * 1000  // Thời gian tồn tại của cookie,
          // });
          // console.log('Cookie set:', res.get('Set-Cookie'))
          return {
            user: user,
            accessToken,
            refreshToken
          }
        } else {
          throw new BadRequestException("Password is not valid!");
        }
      } else {
        throw new BadRequestException("Cannot find users with this email!")
      }
    } catch (err) {
      console.log("error login: ", err);
      throw new BadRequestException(err);
    }
  }

  // Refresh Token
  async refreshToken(req: Request, res: Response) {
    // console.log("req header: ", req);
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, 'REFRESS_TOKEN_SECRET');
      const newAccessToken = this.jwtService.generateAccessToken({ id: payload.id });
      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  // Logout user
  async logout(res: Response): Promise<boolean> {
    res.clearCookie('refresh_token');
    return true;
  }

  //test
  async test(res: Response) {
    console.log("Test mutation")
    return "Test mutation";
  }
}

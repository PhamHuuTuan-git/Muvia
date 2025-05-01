import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

interface UserData {
    name: string;
    email: string;
}

@Injectable()
export class MyJwtService {

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    // create activation token
    async createActivationToken(user: UserData) {
        const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const token = this.jwtService.sign(
            {
                user,
                activationCode
            },
            {
                secret: this.configService.get<string>('ACTIVATION_SECRET'),
                expiresIn: '5m'
            }
        );
        return { token, activationCode }
    }

    // verify token
    verify(token: string, envVariable: string) {
        try {
            const payload= this.jwtService.verify(
                token,
                {
                    secret: this.configService.get<string>(envVariable)
                }
            )
            return payload;
        } catch (err) {
            throw new UnauthorizedException(err);
        }
        
    }

    // create accessToken
    generateAccessToken(data: object) {
        const accessToken = this.jwtService.sign(
            data,
            {
                secret: this.configService.get('ACCESS_TOKEN_SECRET'),
                expiresIn: '15m'
            }
        )
        return accessToken;
    }

    // create refreshToken
    generateRefreshToken(data: object) {
        const reFreshToken = this.jwtService.sign(
            data,
            {
                secret: this.configService.get('REFRESS_TOKEN_SECRET'),
                expiresIn: '7d'
            }
        )
        return reFreshToken;
    }
}
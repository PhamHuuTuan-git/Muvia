import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "apps/users/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { GqlExecutionContext } from "@nestjs/graphql";
import { MyJwtService } from "../jwt.service";

@Injectable()
// - CanActivate là một interface trong NestJS được sử dụng để định nghĩa
// các Guard (bảo vệ). Các Guard được dùng để kiểm tra xem một request 
// có được phép tiếp tục xử lý hay không (dựa trên quyền hạn, xác thực, 
// hoặc điều kiện tùy ý).

// - CanActive hoạt động như 1 middleware, nó hoạt động trước khi request tới
// 1 route hoặc 1 controller nào đó. Bên trong phương thức canActive() Nếu nó return 
// true thì request được đi tiếp giống như next(), còn false thì nó không cho

// - Các Guard được dùng để kiểm tra xem một request có được phép tiếp tục xử 
// lý hay không (dựa trên quyền hạn, xác thực, hoặc điều kiện tùy ý).
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: MyJwtService,
        private readonly prisma: PrismaService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Tạo 1 GraphQL Execution Context từ context được truyền vào
        const gqlContext = GqlExecutionContext.create(context);
        const { req } = gqlContext.getContext();
        const args = gqlContext.getArgs();

        const accessToken = req.headers.accesstoken as string;
        const refreshToken = req.headers.refreshtoken as string;
        const userId = args.id;
        if(!userId) {
            throw new UnauthorizedException("Cannot identify who you are ?");
        }
        if (!accessToken || !refreshToken) {
            throw new UnauthorizedException('Login to access this resource!');
        }
        if (accessToken) {
            try {
                const decoded = this.jwtService.verify(accessToken, 'ACCESS_TOKEN_SECRET')
                if (!decoded) {
                    throw new UnauthorizedException('Invalid access token!');
                }
                if(userId === decoded.id) {
                    return true;
                }
                // await this.updateAccessToken(req);
            } catch(err) {
                throw new BadRequestException(err);
            }
           
        }
        return false;
    }

    private async updateAccessToken(req: any): Promise<void> {
        try {
            const refreshTokenData = req.headers.refreshtoken as string;
            try {
                const decoded = this.jwtService.verify(refreshTokenData, 'REFRESS_TOKEN_SECRET');
                if (!decoded) {
                    throw new UnauthorizedException('Invalid refresh token');
                }
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: decoded.id
                    }
                })
                if (user) {
                    const accessToken = this.jwtService.generateAccessToken({ id: user.id })
                    req.accessToken = accessToken;
                    req.user = user;
                } else {
                    throw new UnauthorizedException('Invalid Id user');
                }
            } catch (error) {
                throw new UnauthorizedException('Invalid refresh token')
            }


        } catch (error) {
            console.log("Update token error: ", error)
        }
    }
}
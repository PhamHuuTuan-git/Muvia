import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "apps/users/prisma/prisma.service";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from 'express';
import { GraphQLClient, gql } from 'graphql-request';
import { ConfigService } from "@nestjs/config";
import { AuthorizeUserPolicyResult } from "../types/movie.type";
@Injectable()
export class AuthenGuardMovie implements CanActivate {
    constructor(
        private readonly configService: ConfigService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlContext = GqlExecutionContext.create(context);
        const ctx = gqlContext.getContext<{ req: Request }>();
        const req = ctx.req;
        const args = gqlContext.getArgs();

        const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
        // console.log("req", req.headers)
        if (!userServiceUrl) {
            throw new Error('USER_SERVICE_URL is not defined in environment');
        }

        const client = new GraphQLClient(userServiceUrl, {
            headers: Object.fromEntries(
                Object.entries(req.headers).filter(
                    ([_, value]) => typeof value === 'string'
                ) as [string, string][]
            ),
        });

        const userId = args?.id || null;
        if (!userId) {
            throw new UnauthorizedException('User ID is required');
        }

        const query = gql`
                query AuthorizeUserPolicy($id: String!) {
                    authorizeUserPolicy(id: $id) 
                }
            `;

        try {
            const result = await client.request<AuthorizeUserPolicyResult>(query, { id: userId });

            if (!result.authorizeUserPolicy) {
                throw new UnauthorizedException("Cannot access this result");
            }

            // Đính thông tin người dùng vào request
            return true;
        } catch (err) {
            console.error('[Guard Error]', err);
            throw new UnauthorizedException(err.message);
        }

    }
}


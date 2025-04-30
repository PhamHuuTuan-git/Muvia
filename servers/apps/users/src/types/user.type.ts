import { ObjectType, Field,Directive } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class ErrorType {
    @Field()
    message: string;

    @Field({ nullable: true })
    // kiểu dữ liệu là string, nếu ko có thì là undefined
    code?: string;

}

@ObjectType()
export class RegisterReponse {
    @Field()
    activation_token: string;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class ActivationResponse {
    @Field(() => User)
    user: User | any;
    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class LoginResponse {

    @Field(() => User)
    user: User | any

    @Field()
    accessToken: string

    @Field()
    refreshToken: string

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class RefreshTokenResponse {

    @Field()
    accessToken: string
}

@ObjectType()
export class CheckTokenResponse {
    @Field(() => User)
    user: User | any;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, isNotEmpty, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Match } from "../utils/customValidator/match.decorator";

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must need to be one string.' })
    name: string;

    @Field()
    @IsNotEmpty({message: 'Password is required.'})
    @MinLength(8, {message:"Password is required at least 8 characters"})
    password: string;

    @Field()
    @IsNotEmpty({message: 'Re-password is required.'})
    @Match('password', { message: 'Confirm password do not match.' })
    rePassword: string;

    @Field()
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email is invalid.' })
    email: string;

    @Field()
    role: string = "user";   
}

@InputType()
export class ActivationDto {
    @Field()
    @IsNotEmpty({message: 'Activation Token is required'})
    activationToken: string;

    @Field()
    @IsNotEmpty({message: 'Activation Code is required'})
    activationCode: string;
}
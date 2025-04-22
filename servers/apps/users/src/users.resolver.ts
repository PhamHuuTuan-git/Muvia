import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
@Resolver()
export class UserResolver {
    constructor(
        private readonly usersService: UsersService
    ) { }

  @Query(() => String)
  helloMovie() {
    return this.usersService.getHello();
  }
}
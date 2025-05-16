import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Protected, Roles } from "src/decorators";
import { UserRoles } from "./enum";
import { CreateUserDto } from "./dtos/create.user.dto";

@Controller({
    path: "users",
    version: ["1"],
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({summary: "Create user"})
    @ApiBearerAuth()
    @Post()
    @Protected(false)
    @Roles([UserRoles.ADMIN])
    async createUser(@Body() payload: CreateUserDto) {
        return this.userService.create(payload);
    }
}
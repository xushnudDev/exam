import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Protected, Roles } from "src/decorators";
import { UserRoles } from "./enum";
import { RegisterUserDto } from "./dtos/register.user";
import { LoginUserDto } from "./dtos/login.user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @Protected(false)
    @Roles([UserRoles.USER, UserRoles.ADMIN])
    async register(@Body() data: RegisterUserDto) {
        return await this.authService.register(data);
    }

    @Post('signin')
    @Protected(false)
    @Roles([UserRoles.USER, UserRoles.ADMIN])
    async login(@Body() data: LoginUserDto) {
        return await this.authService.login(data);
    }
}
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./module";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtHelper } from "src/helpers";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: "secret",
            signOptions: {
                expiresIn: "1d"
            },
        }),
    ],
    controllers: [UserController,AuthController],
    providers: [UserService,AuthService,JwtHelper],
})
export class UserModule {}
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./module";
import { JwtHelper } from "src/helpers";
import { RegisterUserDto } from "./dtos/register.user";
import * as bcrypt from "bcryptjs";
import { LoginUserDto } from "./dtos/login.user.dto";

export class AuthService {
    constructor(@InjectModel(User) readonly userModel: typeof User,private jwtHelper: JwtHelper) {}

    async register(data: RegisterUserDto) {
        await this.#_checkExistingUser(data.email);

        const passwordHash = bcrypt.hashSync(data.password, 10);

        const user = await this.userModel.create({
            ...data,
            password: passwordHash,
        });
        const accessToken = this.jwtHelper.generateToken({id: user.id,role: user.role});
        return {
            message:  "User created successfully",
            data: {
                accessToken,
                user
            }
        }
    };

    async login(data: LoginUserDto) {
        const user = await this.#_checkUserByEmail(data.email);
        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const accessToken = this.jwtHelper.generateToken({id: user.id,role: user.role});
        return {
            message:  "User logged in successfully",
            data: {
                accessToken,
                user
            }
        }
    }

    async #_checkExistingUser(email: string) {
        const user = await this.userModel.findOne({ where: { email } });
        if (user) {
            throw new Error("User already exists");
        }
    }
    async #_checkUserByEmail(email: string) {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) {
            throw new Error("User not found");
        };
        return user.toJSON();
    }
}
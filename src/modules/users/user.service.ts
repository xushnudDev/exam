import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./module";
import { CreateUserDto } from "./dtos/create.user.dto";
import { UserRoles } from "./enum";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService implements OnModuleInit {
    constructor(@InjectModel(User) readonly userModel: typeof User) {}

    async onModuleInit() {
        await this.#_seedUsers();
    };   

    async create(payload: CreateUserDto) {
        const foundedUser = await this.userModel.findOne({where: {email: payload.email}});

        if(foundedUser) {
            throw new Error("User already exists")
        };
        const newUser = await this.userModel.create({
            ...payload
        });
        return {
            message: "User created successfully",
            data: newUser,
        }
    };

    async #_seedUsers() {
    const users = [
      {
        fullname: 'Tursunboyev Xushnudbek',
        email: 'tursunboyevxushnudbek@gmail.com',
        password: 'xushnud1982',
        role: UserRoles.ADMIN,
      },
    ];

    for (let user of users) {
      const newUser = await this.userModel.findOne({
        where: { email: user.email },
      });

      if (!newUser) {
        const passwordHash = bcrypt.hashSync(user.password);
        await this.userModel.create({
          ...user,
          password: passwordHash,
        });
      }
    }
    ('Admins were created successfully');
  }
}
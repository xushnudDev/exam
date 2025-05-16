import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserRoles } from "../enum";

@Table({tableName: 'users',timestamps: true})
export class User extends Model {
    @Column({type: DataType.TEXT})
    fullname: string;

    @Column({type: DataType.TEXT})
    email: string;

    @Column({type: DataType.TEXT})
    password: string;

    @Column({type: DataType.INTEGER})
    age: number;

    @Column({type: DataType.TEXT})
    gender: string;

    @Column({type: DataType.STRING,allowNull: true})
    image: string;

    @Column({type: DataType.ENUM,defaultValue: UserRoles.USER,values: Object.values(UserRoles)})
    role: UserRoles;
}
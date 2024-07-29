import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

//необходим для создания объекта класса User
interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

//Чтобы класс стал таблицей помечаем его @Table, tableName: её название
@Table({tableName: 'post'})
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false}) //allowNull может ли быть не указанным
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string;
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId:number;
//тк рльзователь может обладать множеством постов, связь будет один ко многим
    //тк пост принадлежит конретному пользователю
    @BelongsTo(() => User)
    author: User
}
//на вход в users.service должен поступать объект
//dto - простой объект, который не содержит в себе логики и имеет только поля
//эти объекты предназначены для обменами данных подсистем, например клиент и сервер, или сервер сервер
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({},{message: "Некорректный email"})
    readonly email: string;
    @ApiProperty({example: '12345678', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    //проверка максимальной длинны пароля
    @Length(4,16,{message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}
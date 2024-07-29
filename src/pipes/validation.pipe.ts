//npm i class-validator class-transformer
import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exception/validation.exception";

//pipe имеют 2 осн предназначения, 1 - преобраз входные данные, 2 - валидация основных данных (наш случай)
//Валидация в данном контексте означает проверку подлинности и правильности JWT (JSON Web Token), содержащегося в заголовке авторизации запроса.
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length){
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidationException(messages)

        }
        return value;
    }

}
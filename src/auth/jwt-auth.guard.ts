import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {JwtService} from "@nestjs/jwt";

//создаём для ограничения, например не зарегестрированным пользователям
@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

//Метод canActivate является основным методом, который определяет, может ли запрос пройти.
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //Эта строка получает объект запроса из контекста выполнения. context.switchToHttp().getRequest()
        const req = context.switchToHttp().getRequest();
        try {
            //Здесь мы извлекаем заголовок авторизации из заголовков запроса. Этот заголовок должен содержать токен JWT.
            const authHeader = req.headers.authorization;
            //Мы разделяем заголовок авторизации на две части: тип токена (bearer) и сам токен (token).
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            //Проверка типа токена и наличия токена
            if (bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
//Мы используем jwtService для проверки токена. Если токен действителен, jwtService.verify(token) возвращает объект пользователя, закодированный в токене.
            const user = this.jwtService.verify(token);
            //Если токен успешно проверен, мы присваиваем объект пользователя в запрос. Это позволяет использовать информацию о пользователе в других частях приложения.
            req.user = user;
            return true;

        } catch (e) {
            console.log(e)
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }

    }

}
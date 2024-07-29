//точка входа


import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";


async function start() {
    const PORT = process.env.PORT || 5000;
    //NestFactory.create() — это метод, используемый для создания экземпляра приложения
    //Метод create класса NestFactory инициализирует приложение и возвращает его экземпляр.
    //В типичном использовании вы передаете корневой модуль вашего приложения в качестве аргумента для метода create.
    const app = await NestFactory.create((AppModule));

    //npm i @nestjs/swagger swagger-ui-express
    //Builder такой патерн, который постепенно позволяет
    //для объекта задавать параметры
    const config = new DocumentBuilder()
        .setTitle('Урок по продвинотому BACKEND')
        .setDescription('Документация по REST API')
        .setVersion('1.0.0')
        .addTag('ULBI TV')
        .build()
    //объект самой документации
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

}

start()
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'verbose', 'debug'],
  });

  //예외필터
  app.useGlobalFilters(new HttpExceptionFilter()); //예외필터 전역에서 사용

  //swagger 보안
  app.use(
    ['/docs', 'docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  //swagger
  const config = new DocumentBuilder()
    .setTitle('KLAYPOD')
    .setDescription('The KLAYPOD API description')
    .setVersion('1.0')
    .addTag('klaypod')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // http://localhost:3000/docs

  //cors
  app.enableCors({
    origin: true, //나중에 배포할 때는 특정 url 주소로 변경
    credentials: true, //백엔드 프론트엔드 모두 이 설정을  true로 해야함.
  });

  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import {
  NotAcceptableException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
  }
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1.0',
    prefix: 'v',
  });

  app.enableCors({
    allowedHeaders: ['authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: (reqOrigin, callBack) => {
      const allowedOrigin = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : ['*'];

      if (allowedOrigin.includes(reqOrigin) || allowedOrigin.includes('*')) {
        return callBack(null, true);
      } else {
        callBack(
          new NotAcceptableException(`${reqOrigin} is not allowed by CORS`),
        );
      }
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Exam Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV === 'development') {
    SwaggerModule.setup('api', app, documentFactory);
  };

  const port = Number(process.env.APP_PORT) || 3000;
  await app.listen(port,() => {
    console.log(`Server is running http://localhost:${port}/api`);
  })
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('NestJS MongoDB API')
    .setDescription('The NestJS MongoDB API description')
    .setVersion('1.0')
    .addServer('http://localhost:${process.env.PORT }')
    .addTag('nestjs', 'mongodb')
    .build();
  const documnet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documnet);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `MongoDB is running on:`,
    process.env.MONGO_URI,
    'port:',
    process.env.PORT,
  );
  console.log('swagger.port:' + `${process.env.PORT ?? 3000}`);
}
bootstrap();

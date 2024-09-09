import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('ParkEase | Hardik Rathod')
    .setDescription(
      `The ParkEase API.
        <h2>Looking for the graphql api?</h2>
        Go to <a href="/graphql" target="_blank">/graphql</a>.
        Or,
        You might also need to use the <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql&document=query users{users{ uid }}
        ">Apollo explorer</a> for a greater experience.
      `,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)
  await app.listen(3000)
}
bootstrap()

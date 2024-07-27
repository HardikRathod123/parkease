import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: process.env.NODE_ENV === 'development',
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      //   buildSchemaOptions: {
      //      numberScalarMode: 'integer',
      //   },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.respository'
import { User } from './entities/user.entity'
import { DataSource } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
      inject: [DataSource]
    }
  ],
  exports: [UserRepository]
})
export class AuthModule {}

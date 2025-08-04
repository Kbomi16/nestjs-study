import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.respository'
import { User } from './entities/user.entity'
import { DataSource } from 'typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  // * 다른 모듈들을 불러와서 이 모듈 안에서 사용할 수 있게 함
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234', // 생성할 때 주는 비밀 키
      signOptions: {
        expiresIn: 60 * 60 // 1 hour
      }
    }),

    TypeOrmModule.forFeature([User])
  ],
  // * 이 모듈에 속한 컨트롤러 클래스들
  controllers: [AuthController],
  // * 서비스, 리포지토리, 전략(strategy) 같은 주입 가능한 클래스들을 등록하는 곳
  // * NestJS의 의존성 주입(Dependency Injection) 컨테이너에 등록됨
  providers: [
    AuthService,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
      inject: [DataSource]
    },
    JwtStrategy
  ],
  // * 이 모듈에서 만든 provider들을 다른 모듈에서 쓸 수 있도록 외부에 공개하는 역할
  exports: [UserRepository, JwtStrategy, PassportModule]
})
export class AuthModule {}

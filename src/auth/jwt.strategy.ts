import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserRepository } from './user.respository'
import { User } from './entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      secretOrKey: 'Secret1234', // 유효한지 체크하는 비밀 키
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload) {
    const { username } = payload
    const user: User | null = await this.userRepository.findOne({
      where: { username }
    })

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.')
    }
    return user // 유저가 있으면 인증 성공
  }
}

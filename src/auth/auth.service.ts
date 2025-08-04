import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.respository'
import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { User } from './entities/user.entity'
import { Board } from 'src/boards/board.entity'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password!, salt)

    const user: User = User.create({
      username,
      password: hashedPassword
    })

    return this.userRepository.create(user)
    // return this.userRepository.createUser(authCredentialsDto)
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto
    const user = await this.userRepository.findOne({ where: { username } })

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload) // 중요 정보는 넣으면 안 됨
      const payload = { username }
      const accessToken = await this.jwtService.sign(payload)
      return { accessToken: accessToken }
    }
    throw new UnauthorizedException('로그인 실패')
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.respository'
import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { User } from './entities/user.entity'
import { Board } from 'src/boards/board.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto
    const user = await this.userRepository.findOne({ where: { username } })

    if (user && (await bcrypt.compare(password, user.password))) {
      return '로그인 성공'
    }
    throw new UnauthorizedException('로그인 실패')
  }
}

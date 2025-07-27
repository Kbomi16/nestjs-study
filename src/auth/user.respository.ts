import { Auth, DataSource, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async createUser(authCredentialsDto: Auth): Promise<User> {
    const { username, password } = authCredentialsDto

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password!, salt)

    const user = this.create({
      username,
      password: hashedPassword
    })

    try {
      await this.save(user)
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Username already exists')
      }
      throw new InternalServerErrorException()
    }

    return user
  }
}

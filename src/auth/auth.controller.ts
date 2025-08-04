import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { User } from './entities/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'

@Controller('auth')
@UseGuards(AuthGuard())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void | User> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user) // JWT가 검증되면 user 정보가 들어있음
  }
}

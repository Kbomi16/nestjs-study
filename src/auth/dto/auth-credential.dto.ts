import { IsString, Matches, MaxLength, Min, MinLength } from 'class-validator'

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영어와 숫자만 포함할 수 있습니다.'
  }) // 영어랑 숫자만 가능함
  password: string
}

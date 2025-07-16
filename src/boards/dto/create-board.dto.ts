/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty } from 'class-validator'

export class CreateBoardDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}

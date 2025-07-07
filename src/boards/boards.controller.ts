import { Controller, Get } from '@nestjs/common'
import { BoardsService } from './boards.service'
import { Board } from './board.model'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // 모든 게시물 가져오기
  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards()
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'
import { Board } from './board.entity'
import { BoardStatus } from './board-status.enum'
import { User } from 'src/auth/entities/user.entity'
import { GetUser } from 'src/auth/get-user.decorator'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // ! 게시물 전체 GET
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards()
  }

  // ! 특정 게시물 GET
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id)
  }

  // ! 게시물 POST
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() CreateBoardDto: CreateBoardDto,
    @GetUser() user: User
  ): Promise<Board> {
    return this.boardsService.createBoard(CreateBoardDto, user)
  }

  // ! 게시물 DELETE
  @Delete('/:id')
  deleteBoardX$id(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user)
  }

  // ! 게시물 UPDATE
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status)
  }
}

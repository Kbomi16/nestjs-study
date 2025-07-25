import { Injectable, NotFoundException, Param } from '@nestjs/common'
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatus } from './board-status.enum'
import { BoardRepository } from './board.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './board.entity'
import { Repository } from 'typeorm'

@Injectable()
export class BoardsService {
  constructor(
    // @InjectRepository(BoardRepository)
    // private boardRepository: BoardRepository
    @InjectRepository(Board)
    private boardRepository: Repository<Board>
  ) {}

  // ! 게시물 전체 GET
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find()
  }

  // ! 특정 게시물 GET
  async getBoardById(id: number): Promise<Board> {
    // 버전 바뀜
    // const found = await this.boardRepository.findOne(id)
    const found = await this.boardRepository.findOne({
      where: { id }
    })

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
    return found
  }

  // ! 게시물 POST
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.create(createBoardDto)
  }

  // ! 게시물 DELETE
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }

  // ! 게시물 UPDATE
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id)
    board.status = status
    await this.boardRepository.save(board)
    return board
  }
}

import { EntityRepository, Repository } from 'typeorm'
import { Board } from './board.entity'

@EntityRepository(Board)
export class BaordRepository extends Repository<Board> {}

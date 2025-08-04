import { Board } from 'src/boards/board.entity'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  // eager : true 일때는 user 정보를 가져올때 board도 같이 가져옴
  @OneToMany(type => Board, board => board.user, { eager: true })
  boards: Board[]
}

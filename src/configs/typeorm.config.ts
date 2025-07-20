import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions
} from '@nestjs/typeorm'

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  // type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'kimbomi',
  // password: 'bomi16',
  // database: 'board-app',
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // synchronize: true
  useFactory: (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'kimbomi',
    password: 'bomi16',
    database: 'board-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
  })
}

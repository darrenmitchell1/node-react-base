import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemTypeModule } from './item-type/item-type.module';
import { ItemModule } from './item/item.module';
import { StatementModule } from './statement/statement.module';
import { ItemTransactionModule } from './item-transaction/item-transaction.module';
import configuration from './config/configuration';
import { pgDataSourceOptions } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(pgDataSourceOptions),
    ItemTypeModule,
    ItemModule,
    ItemTransactionModule,
    StatementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

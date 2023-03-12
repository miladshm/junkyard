import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Report} from 'src/reports/report.entity';
import {ReportsModule} from 'src/reports/reports.module';
import {User} from 'src/users/user.entity';
import {UsersModule} from 'src/users/users.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}

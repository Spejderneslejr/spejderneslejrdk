import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CamposModule } from './campos/campos.module';
import { ApiconfigService } from './apiconfig/apiconfig.service';

@Module({
  imports: [CamposModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ApiconfigService],
})
export class AppModule {}

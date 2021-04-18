import { Module } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CamposController } from './campos.controller';
import { ConfigModule } from '@nestjs/config';
import { ApiconfigService } from '../apiconfig/apiconfig.service';

@Module({
  imports: [ConfigModule],
  providers: [CamposService, ApiconfigService],
  controllers: [CamposController],
})
export class CamposModule {}

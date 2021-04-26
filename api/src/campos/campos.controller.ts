import { Controller, Get } from '@nestjs/common';
import { CamposService } from './campos.service';

@Controller('campos')
export class CamposController {
  constructor(private camposService: CamposService) {}

  @Get('jobs')
  async jobs(): Promise<string> {
    return await this.camposService.executeKw('hr.job', 'search_read', [], {
      fields: ['name', 'organization_id','state','user_id','description','description_time_and_scope','description_we_give','description_you_give','write_date'],
      context: { show_org_path: true },
    });
  }
}

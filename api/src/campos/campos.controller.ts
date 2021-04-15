import { Controller, Get } from '@nestjs/common';
import { CamposService } from './campos.service';

@Controller('campos')
export class CamposController {
  constructor(private camposService: CamposService) {}

  @Get('jobs')
  async jobs(): Promise<string> {
    return await this.camposService.executeKw('hr.job', 'search_read', [], {
      fields: ['name', 'organization_id'],
      context: { show_org_path: true },
    });
  }
}

import { Controller, Get } from '@nestjs/common';
import { CamposService } from './campos.service';

@Controller('campos')
export class CamposController {
  constructor(private camposService: CamposService) { }

  @Get('jobs')
  async jobs(): Promise<string> {
    return await this.camposService.executeKw('hr.job', 'search_read', [], {
      fields: ['name', 'organization_id', 'area_organization_id', 'state', 'user_id', 'teaser', 'description', 'description_time_and_scope', 'description_we_give',
       'description_you_give', 'no_of_recruitment', 'no_of_hired_employee', 'write_date', 'create_date', 'user_name', 'user_email'],
      context: { show_org_path: true },
    });
  }
}

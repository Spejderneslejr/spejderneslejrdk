import { Controller, Get } from '@nestjs/common';
import { CamposService } from './campos.service';

// TODO - these mixed string/bools are messy. We should have a cleanup phase
//   that fixes these up.
type Job = {
  description_time_and_scope: boolean | string,
  write_date: string,
  area_organization_id: string,
  description: boolean | string,
  name: string,
  teaser: string,
  id: number,
  description_we_give: boolean | string,
  description_you_give: boolean | string,
};

@Controller('campos')
export class CamposController {
  constructor(private camposService: CamposService) { }

  @Get('jobs')
  async jobs(): Promise<Array<Job>> {
    // The typecast here is a bit strange. executeKw declares it returns a string,
    // but it actually returns an object.
    const jobs: Array<Job> = (await this.camposService.executeKw('hr.job', 'search_read', [], {
      fields: ['name', 'organization_id', 'area_organization_id', 'state', 'user_id', 'teaser', 'description', 'description_time_and_scope', 'description_we_give',
        'description_you_give', 'no_of_recruitment', 'no_of_hired_employee', 'write_date', 'create_date', 'user_name', 'user_email'],
      context: { show_org_path: true },
    }) as unknown) as Array<Job>;

    const cleanedJobs = jobs.map((job) => {
      job.description = cleanDotHack(job.description);
      job.description_time_and_scope = cleanDotHack(job.description_time_and_scope);
      job.description_we_give = cleanDotHack(job.description_we_give);
      job.description_you_give = cleanDotHack(job.description_you_give);
      return job;
    });

    return cleanedJobs;
  }
}

// We have a number of jobs with optional fields set to ".".
// While we could just display these values to motivate the editor to change
// the value, well just blank it out properly now to preserve the user-
// experience.
function cleanDotHack(value: string|boolean) : string|boolean {
  if (value === ".") {
    return false;
}
return value;

}

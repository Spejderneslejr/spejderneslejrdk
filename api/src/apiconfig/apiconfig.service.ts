import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiconfigService {
  constructor(private configService: ConfigService) {
    // TODO: Validate
  }

  get odooHostname(): string {
    return this.configService.get('ODOO_HOSTNAME');
  }
  get odooUID(): string {
    return this.configService.get('ODOO_UID');
  }
  get odooPassword(): string {
    return this.configService.get('ODOO_PASSWORD');
  }
  get odooDB(): string {
    return this.configService.get('ODOO_DB');
  }
}

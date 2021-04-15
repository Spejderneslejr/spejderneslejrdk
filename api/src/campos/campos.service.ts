import { Injectable } from '@nestjs/common';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import * as xmlrpc from 'xmlrpc';

@Injectable()
export class CamposService {
  constructor(private config: ApiconfigService) {}

  executeKw(
    model: string,
    method: string,
    paramsByPosition: string[] = [],
    paramsByKeyword: unknown = {},
  ): Promise<string> {
    const clientOptions = {
      host: this.config.odooHostname,
      port: 443,
      path: '/xmlrpc/2/object',
    };
    const client = xmlrpc.createSecureClient(clientOptions);

    const fparams = [];
    fparams.push(this.config.odooDB);
    fparams.push(this.config.odooUID);
    fparams.push(this.config.odooPassword);
    fparams.push(model);
    fparams.push(method);
    fparams.push(paramsByPosition);
    fparams.push(paramsByKeyword);

    return new Promise((resolve, reject) => {
      client.methodCall('execute_kw', fparams, function (error, value) {
        if (error) {
          return reject(error);
        }
        return resolve(value);
      });
    });
  }
}

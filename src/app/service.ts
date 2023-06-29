import { Injectable } from '@nestjs/common'

import { version } from '../../package.json'

@Injectable()
export class AppService {
  getHealth(): { timestamp: Date; package_version: string } {
    return {
      timestamp: new Date(),
      package_version: version,
    }
  }
}

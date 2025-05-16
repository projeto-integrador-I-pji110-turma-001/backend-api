import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { GlobalConfig } from '../../application/config/globalConfig';
import { AwilixResolver } from '../resolver';

export class Database extends AwilixResolver {
  private dataSource: DataSource;

  constructor(private globalConfig: GlobalConfig) {
    super();
  }

  async initConnection() {
    this.dataSource = new DataSource({
      type: this.globalConfig.db.url.split(':')[0] as 'postgres',
      url: this.globalConfig.db.url,
      logging: this.globalConfig.db.log,
      entities: [__dirname + '/entities/*.{js,ts}', __dirname + '/entities/**/*.{js,ts}'],
    });
    await this.dataSource.initialize();
    await this.dataSource.synchronize();
  }

  getEntity(entity: EntityTarget<ObjectLiteral>) {
    return this.dataSource.getRepository(entity);
  }

  async dispose() {
    if (this.dataSource) {
      return this.dataSource.destroy();
    }
  }
}

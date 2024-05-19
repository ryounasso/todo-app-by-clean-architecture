import { InsertStatusDto } from './insertStatus.dto';
import { StartDto } from '../../usecases/start.dto';

export interface StatusRepository {
  insertStatus(insertStatusDto: InsertStatusDto): Promise<StartDto>;
}

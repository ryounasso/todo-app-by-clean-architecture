import { Inject } from '@nestjs/common';
import { StatusRepository } from './status.repository';
import { PrismaService } from '../prisma.service';
import { InsertStatusDto } from './insertStatus.dto';
import { StartDto } from '../../usecases/start.dto';
import { Status } from '../../entities/status';

export class StatusRepositoryImpl implements StatusRepository {
  constructor(
    @Inject('PrismaService') private readonly prisma: PrismaService,
  ) {}

  async insertStatus(insertStatusDto: InsertStatusDto): Promise<StartDto> {
    if (!Status.isValidStatus(insertStatusDto.getStatus())) {
      throw new Error('Invalid status');
    }

    const status = await this.prisma.insertStatus({
      taskId: insertStatusDto.getTaskId(),
      status: insertStatusDto.getStatus(),
    });

    return new StartDto(status.taskId, status.status);
  }
}

import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';

@Module({
    imports: [],
    providers: [UserGroupService],
    controllers: [UserGroupController],
    exports: [UserGroupService],
})
export class UserGroupModule {}

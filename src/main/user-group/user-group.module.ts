import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';

@Module({
    imports: [],
    providers: [UserGroupService],
    exports: [UserGroupService],
})
export class UserGroupModule {}

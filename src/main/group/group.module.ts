import { Module } from '@nestjs/common';
import { GroupService } from './group.service';

@Module({
    imports: [],
    providers: [GroupService],
    exports: [GroupService],
})
export class GroupModule {}

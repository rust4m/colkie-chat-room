import { Module } from '@nestjs/common';
import { MessageRecipientService } from './message-recipient.service';

@Module({
    imports: [],
    providers: [MessageRecipientService],
    exports: [MessageRecipientService],
})
export class MessageRecipientModule {}

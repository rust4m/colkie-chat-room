import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageRecipient {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'uuid', unique: true, name: 'user_group_id' })
    userGroupId?: string;

    @Column({ type: 'integer', unique: true, name: 'message_id' })
    messageId?: string;
}

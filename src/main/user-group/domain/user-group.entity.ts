import { Message } from 'src/main/message/domain/message.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'uuid', unique: true, name: 'user_id' })
    userId?: string;

    @Column({ type: 'uuid', unique: true, name: 'group_id' })
    groupId?: string;

    @ManyToMany(() => Message, message => message.userGroups)
    @JoinTable()
    messsages?: Message[];
}

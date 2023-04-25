import { UserGroup } from 'src/main/user-group/domain/user-group.entity';
import { User } from 'src/main/user/domain/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @CreateDateColumn({ default: () => 'NOW()', name: 'created_at' })
    createdAt?: Date;

    @Column({ type: 'varchar', length: 100 })
    content?: string;

    @Column({ type: 'varchar', length: 10 })
    subject?: string;

    @Column({ type: 'int', unique: true, name: 'prev_message_id' })
    prevMessageId?: number;

    @ManyToOne(() => User, (user: User) => user.messages)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @ManyToMany(() => UserGroup, userGroup => userGroup.messsages)
    @JoinTable({
        name: 'message_recipient',
        joinColumn: { name: 'message_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_group_id', referencedColumnName: 'id' },
    })
    userGroups?: UserGroup[];
}

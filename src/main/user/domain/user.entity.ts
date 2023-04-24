import { Group } from 'src/main/group/domain/group.entity';
import { Message } from 'src/main/message/domain/message.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    JoinTable,
    ManyToMany,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @CreateDateColumn({ default: () => 'NOW()', name: 'created_at' })
    createdAt?: Date;

    @Column({ type: 'varchar', unique: true, length: 20, name: 'full_name' })
    fullName?: string;

    @OneToMany(() => Message, (message: Message) => message.user)
    messages?: Message[];

    @ManyToMany(() => User, user => user.groups)
    @JoinTable({
        name: 'user_group',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
    })
    groups?: Group[];
}

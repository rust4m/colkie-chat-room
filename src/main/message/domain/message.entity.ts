import { User } from 'src/main/user/domain/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @CreateDateColumn({ default: () => 'NOW()', name: 'created_at' })
    createdAt?: Date;

    @Column({ type: 'varchar', length: 100 })
    content: string;

    @Column({ type: 'varchar', length: 10 })
    subject: string;

    @Column({ type: 'int', unique: true, name: 'prev_message_id' })
    prevMessageId?: number;

    @ManyToOne(() => User, (user: User) => user.messages)
    @JoinColumn({ name: 'userId' })
    user?: User;
}

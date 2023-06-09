import { User } from 'src/main/user/domain/user.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @CreateDateColumn({ default: () => 'NOW()', name: 'created_at' })
    createdAt?: Date;

    @Column({ type: 'varchar', unique: true, length: 20 })
    name?: string;

    @ManyToMany(() => User)
    users?: User[];
}

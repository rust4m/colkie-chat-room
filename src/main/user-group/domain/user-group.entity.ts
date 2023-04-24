import { Entity, Column, PrimaryGeneratedColumn, Index, Unique, CreateDateColumn } from 'typeorm';

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'uuid', unique: true, name: 'user_id' })
    userId?: string;

    @Column({ type: 'uuid', unique: true, name: 'group_id' })
    groupId?: string;
}

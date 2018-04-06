import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @Column('text')
    description: string;
    @Column({ type: 'boolean', default: false })
    completed: boolean;
}
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('url')
export class UrlEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    url!: string;

    @Column({name: 'short_code', type: 'text'})
    shortCode!: string;

    @CreateDateColumn({
        name: 'created_at', 
        type: 'timestamptz', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt!: Date;

    @CreateDateColumn({
        name: 'updated_at', 
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt!: Date;
}
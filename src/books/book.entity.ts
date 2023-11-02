import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id: number
}
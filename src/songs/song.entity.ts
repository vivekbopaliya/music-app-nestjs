import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';
import { User } from '../users/user.entity';

@Entity('songs')
export class Song {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
@IsString()
title: string;

@Column()
@IsString()
artist: string;

@Column({ nullable: true })
@IsString()
@IsOptional()
genre?: string;

@Column({ nullable: true })
@IsString()
@IsOptional()
coverImageUrl?: string;

@ManyToMany(() => User, (user) => user.favoriteSongs)
favoritedBy: User[];
}
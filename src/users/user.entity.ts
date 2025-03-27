import { Song } from "src/songs/song.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ unique: true })
email: string;

@Column()
name: string;

@Column()
password: string;

@ManyToMany(() => Song, { eager: false })
@JoinTable({
name: 'user_favorite_songs',
joinColumn: { name: 'userId', referencedColumnName: 'id' },
inverseJoinColumn: { name: 'songId', referencedColumnName: 'id' },
})
favoriteSongs: Song[];

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;

@Column({ default: true })
isActive: boolean;
}
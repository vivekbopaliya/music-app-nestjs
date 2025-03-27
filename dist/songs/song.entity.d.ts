import { User } from '../users/user.entity';
export declare class Song {
    id: string;
    title: string;
    artist: string;
    genre?: string;
    coverImageUrl?: string;
    favoritedBy: User[];
}

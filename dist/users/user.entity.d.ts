import { Song } from "src/songs/song.entity";
export declare class User {
    id: string;
    email: string;
    name: string;
    password: string;
    favoriteSongs: Song[];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

import { Repository } from "typeorm";
import { CreateSongDto } from "./dto/create-song.dto";
import { User } from "src/users/user.entity";
import { Song } from "./song.entity";
export declare class SongsService {
    private songsRepository;
    private usersRepository;
    constructor(songsRepository: Repository<Song>, usersRepository: Repository<User>);
    create(createSongDto: CreateSongDto): Promise<Song>;
    findAll(): Promise<Song[]>;
    search(query: string): Promise<Song[]>;
    toggleFavorite(songId: string, userId: string): Promise<void>;
    getFavorites(userId: string): Promise<Song[]>;
}

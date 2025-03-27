import { SongsService } from "./songs.service";
import { CreateSongDto } from "./dto/create-song.dto";
import { Song } from "./song.entity";
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    create(createSongDto: CreateSongDto): Promise<Song>;
    findAll(): Promise<Song[]>;
    search(query: string): Promise<Song[]>;
    toggleFavorite(songId: string, req: any): Promise<{
        message: string;
    }>;
    getFavorites(req: any): Promise<Song[]>;
}

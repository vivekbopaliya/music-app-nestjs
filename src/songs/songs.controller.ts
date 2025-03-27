import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDto } from "./dto/create-song.dto";
import { Song } from "./song.entity";
import { JwtAuthGuard } from "src/auth/jwt.strategy";

@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get("search")
  search(@Query("q") query: string): Promise<Song[]> {
    return this.songsService.search(query);
  }
  @UseGuards(JwtAuthGuard)
  @Post(":id/favorite")
  async toggleFavorite(
    @Param("id") songId: string,
    @Request() req,
  ): Promise<{ message: string }> {
    console.log(req.user)
    await this.songsService.toggleFavorite(songId, req.user.id);
    return { message: "Favorite status updated successfully" };
  }
  @UseGuards(JwtAuthGuard)
  @Get("favorites")
  getFavorites(@Request() req): Promise<Song[]> {
    return this.songsService.getFavorites(req.user.id);
  }
}

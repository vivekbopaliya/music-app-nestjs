import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { CreateSongDto } from "./dto/create-song.dto";
import { User } from "src/users/user.entity";
import { Song } from "./song.entity";

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create(createSongDto);
    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async search(query: string): Promise<Song[]> {
    return await this.songsRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { artist: Like(`%${query}%`) },
        { genre: Like(`%${query}%`) },
      ],
    });
  }

  async toggleFavorite(songId: string, userId: string): Promise<void> {
    console.log("thjis is called")
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["favoriteSongs"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const song = await this.songsRepository.findOne({
      where: { id: songId },
    });

    if (!song) {
      throw new NotFoundException("Song not found");
    }

    const favoriteIndex = user.favoriteSongs.findIndex((s) => s.id === songId);

    if (favoriteIndex > -1) {
      user.favoriteSongs = user.favoriteSongs.filter((s) => s.id !== songId);
    } else {
      user.favoriteSongs.push(song);
    }

    await this.usersRepository.save(user);
  }

  async getFavorites(userId: string): Promise<Song[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["favoriteSongs"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user.favoriteSongs;
  }
}

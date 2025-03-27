"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const song_entity_1 = require("./song.entity");
let SongsService = class SongsService {
    constructor(songsRepository, usersRepository) {
        this.songsRepository = songsRepository;
        this.usersRepository = usersRepository;
    }
    async create(createSongDto) {
        const song = this.songsRepository.create(createSongDto);
        return await this.songsRepository.save(song);
    }
    async findAll() {
        return await this.songsRepository.find();
    }
    async search(query) {
        return await this.songsRepository.find({
            where: [
                { title: (0, typeorm_2.Like)(`%${query}%`) },
                { artist: (0, typeorm_2.Like)(`%${query}%`) },
                { genre: (0, typeorm_2.Like)(`%${query}%`) },
            ],
        });
    }
    async toggleFavorite(songId, userId) {
        console.log("thjis is called");
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ["favoriteSongs"],
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const song = await this.songsRepository.findOne({
            where: { id: songId },
        });
        if (!song) {
            throw new common_1.NotFoundException("Song not found");
        }
        const favoriteIndex = user.favoriteSongs.findIndex((s) => s.id === songId);
        if (favoriteIndex > -1) {
            user.favoriteSongs = user.favoriteSongs.filter((s) => s.id !== songId);
        }
        else {
            user.favoriteSongs.push(song);
        }
        await this.usersRepository.save(user);
    }
    async getFavorites(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ["favoriteSongs"],
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user.favoriteSongs;
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(song_entity_1.Song)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SongsService);
//# sourceMappingURL=songs.service.js.map
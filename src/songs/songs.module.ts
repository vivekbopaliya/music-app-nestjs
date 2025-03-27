import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SongsController } from "./songs.controller";
import { SongsService } from "./songs.service";
import { User } from "src/users/user.entity";
import { Song } from "./song.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Song, User])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}

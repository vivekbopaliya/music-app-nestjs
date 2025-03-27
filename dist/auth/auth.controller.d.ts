import { Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        favoriteSongs: import("../songs/song.entity").Song[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    }>;
    login(loginDto: LoginDto, response: Response): Promise<{
        message: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}

import { Request } from 'express';

export interface RegisterUserRequest {
    email: string;
    name: string;
    mobile: number;
    gender: string;
    password: string;
}

export interface JwtTokenRequest {
    email: string;
    expirationDate: Date;
}

export interface customType extends Request {
    userId: string;
}

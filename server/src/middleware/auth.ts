import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from '../utils/AsyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export interface customType extends Request {
    userId: string | JwtPayload;
}

export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;

        if (!token) {
            throw new ApiError(502, 'token is required!');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as customType).userId = (decoded as JwtPayload).userId;

        next();
    } catch (error: any) {
        console.log('error', error);
        res.status(error.statusCode || 401).json(new ApiResponse(error?.statusCode || 401, null, error?.message || 'Invalid token'));
    }
});

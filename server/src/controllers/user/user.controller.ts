import { Request, Response } from 'express';
import { prisma } from '../../Model/index.js';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/AsyncHandler.js';
import { hashSync, compareSync } from 'bcrypt';
import { RegisterUserRequest } from './userTypes.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, name, mobile, gender, password } = req.body;
        let payload: RegisterUserRequest = {
            email: email,
            name: name,
            mobile: mobile,
            gender: gender,
            password: hashSync(password, 10)
        };

        const createUser = await prisma.user.create({ data: payload });
        return res.json(new ApiResponse(200, createUser, 'new user add successfully'));
    } catch (error: any) {
        console.error(error);

        // send error response to the client
        res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || 'Registration Error'));
    }
});

export const getAllUser = asyncHandler(async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        return res.json(new ApiResponse(200, users, 'user get successfully'));
    } catch (error: any) {
        console.log('err', error);

        res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || 'Registration Error'));
    }
});

export const logginUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        let user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
            throw new ApiError(502, 'User does not exists!');
        }
        if (!compareSync(password, user.password)) {
            throw new ApiError(502, 'Incorrect password!');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '2 days'
        });

        res.cookie('token', token);

        return res.json(new ApiResponse(200, { email: user.email, name: user.name, mobile: user.mobile, token: token }, 'login successfully'));
    } catch (error: any) {
        console.log(error);
    }
});

export interface customType extends Request {
    userId: string;
}

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = (req as customType).userId;
        const users = await prisma.user.findFirst({ where: { id: userId } });

        return res.json(new ApiResponse(200, users, 'user get successfully'));
    } catch (error: any) {
        console.log('err', error);

        res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || 'Registration Error'));
    }
});

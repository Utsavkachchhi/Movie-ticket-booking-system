import { compareSync, hashSync } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../Model/index.js';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/AsyncHandler.js';
import { JwtTokenRequest, RegisterUserRequest, customType } from './userTypes.js';
import { generateToken } from '../../utils/CommonFunctions.js';
import { forgotPasswordMail } from '../../utils/nodemailer.js';

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
});

export const getAllUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany();

        return res.json(new ApiResponse(200, users, 'user get successfully'));
    } catch (error: any) {
        console.log('err', error);
        next(error);
    }
});

export const logginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        let user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
            throw new ApiError(502, 'User does not exists!');
        }
        if (!compareSync(password, user.password)) {
            throw new ApiError(502, 'Incorrect password!');
        }

        const token = generateToken(user.id, '1d');

        res.cookie('token', token);

        return res.json(new ApiResponse(200, { email: user.email, name: user.name, mobile: user.mobile, token: token }, 'login successfully'));
    } catch (error: any) {
        console.log(error);
        next(error);
    }
});

export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as customType).userId;
        const users = await prisma.user.findFirst({ where: { id: userId } });

        return res.json(new ApiResponse(200, users, 'user get successfully'));
    } catch (error: any) {
        console.log('err', error);
        next(error);
    }
});

export const forgotPasswordSend = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new ApiError(502, 'email address is required');
        }

        const users = await prisma.user.findFirst({ where: { email: email } });

        if (!users) {
            throw new ApiError(502, 'Invalid email address!');
        }

        const token = generateToken(email, '45m');

        const link = `http://localhost:8005/api/v1/user/verify?token=${token}`;
        const sendMail = forgotPasswordMail(email, 'Forget password link', link);
        return res.json(new ApiResponse(200, null, 'mail send successfully'));
    } catch (error: any) {
        console.log('err', error);
        next(error);
    }
});

export const forgotPasswordVerify = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;
        if (!token) {
            throw new ApiError(502, 'Invalid user token');
        }

        let decodedToken = jwt.verify(token as any, process.env.JWT_SECRET as string) as JwtTokenRequest;

        if (!decodedToken.hasOwnProperty('email') || !decodedToken.hasOwnProperty('expirationDate')) {
            throw new ApiError(502, 'Invalid authentication credentials.');
        }

        const { expirationDate, email } = decodedToken;

        if (new Date(expirationDate) < new Date()) {
            throw new ApiError(502, 'Token has expired.');
        }

        const users: any = await prisma.user.findFirst({ where: { email: email } });

        if (!users) {
            throw new ApiError(502, 'Invalid email address!');
        }

        if (compareSync(newPassword, users.password)) {
            throw new ApiError(502, 'new password must be different from old password!');
        }

        const updatedPassword = await prisma.user.update({
            where: { id: users.id },
            data: {
                password: hashSync(newPassword, 10)
            }
        });
        return res.json(new ApiResponse(200, updatedPassword, 'user detail update successfully'));
    } catch (error: any) {
        console.log('err', error);
        next(error);
    }
});

export const changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await prisma.user.findFirst({ where: { id: req.params.id } });

        if (!user) {
            throw new ApiError(502, 'User does not exists!');
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            throw new ApiError(502, 'new password and confirm password must be same!');
        }

        if (compareSync(req.body.newPassword, user.password)) {
            throw new ApiError(502, 'new password must be different from old password!');
        }

        const updatedPassword = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                password: hashSync(req.body.newPassword, 10)
            }
        });
        return res.json(new ApiResponse(200, updatedPassword, 'user detail update successfully'));
    } catch (error: any) {
        console.log('error', error);
        next(error);
    }
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('token').json(new ApiResponse(200, null, 'user logout successfully')).status(200);
    } catch (error: any) {
        console.log('error', error);
        next(error);
    }
});

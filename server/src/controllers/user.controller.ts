import { prisma } from '../Model/index.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/AsyncHandler.js';

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const { email, name, mobile, gender } = req.body;
        let payload = {
            email: email,
            name: name,
            mobile: mobile,
            gender: gender
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
        throw new ApiError(502, 'something wrong');
        console.log('users>>', users);
        return res.json(new ApiResponse(200, users, 'user get successfully'));
    } catch (error: any) {
        console.log('err', error);

        res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || 'Registration Error'));
    }
});

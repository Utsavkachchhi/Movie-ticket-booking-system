import express from 'express';
import {
    getAllUser,
    registerUser,
    logginUser,
    getUser,
    changePassword,
    forgotPasswordSend,
    forgotPasswordVerify,
    logout
} from '../controllers/user/user.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/userhealth', (req, res) => {
    res.json({ Message: 'User Route Added' });
});

router.post('/users', registerUser);
router.post('/login', logginUser);
router.get('/users', auth, getAllUser);
router.get('/', auth, getUser);
router.put('/:id', auth, changePassword);
router.get('/passwordForget', forgotPasswordSend);
router.post('/logout', auth, logout);
router.post('/verify', forgotPasswordVerify);

export default router;

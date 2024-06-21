import express from 'express';
import { getAllUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/userhealth', (req, res) => {
    res.json({ Message: 'User Route Added' });
});

router.get('/users', getAllUser);
router.post('/users', registerUser);

export default router;

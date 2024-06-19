import  express from 'express';
import UserRouter from "./User.js"

const router = express.Router();

router.use('/user',UserRouter);

export default router
import  express from 'express';

const router = express.Router();

router.get('/userhealth',(req,res)=>{
    res.json({"Message":"User Route Added"})
});

export default router

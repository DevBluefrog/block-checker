import express from 'express';
import db from '../models';

const router = express.Router();

router.get('/query', async(req, res) => {
    const query = await db.query.findAll({});

    return res.json(query);
});

router.get('/query/:address', async(req, res) => {
    try{
        const query = await db.query.findOne({
            where: { queryAddress: req.params.address }
        });

        if(query == null){
            return res.json(false);
        }else{
            console.log(query)
            return res.json(query);
        }
    }catch(err){
        console.log(err);
    }
});

router.post('/query', async(req, res) => {
    const query = await db.query.create({
        queryAddress: req.body.queryAddress,
        queryComment: req.body.queryComment,
        queryContributor: req.body.queryContributor,
    });
    return res.json(true);
});

export default router;
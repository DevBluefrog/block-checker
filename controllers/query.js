import express from 'express';
import db from '../models';

const router = express.Router();

router.get('/query', async(req, res) => {
    const query = await db.query.findAll({});

    return res.json(query);
});

router.get('/query/:queryAddress', async(req, res) => {
    try{
        const query = await db.query.findOne({
            where: { queryAddress: req.params.queryAddress }
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
    try{    
        const query = await db.query.create({
            queryAddress: req.body.queryAddress,
            queryComment: req.body.queryComment,
            queryContributor: req.body.queryContributor,
            queryPoint: 0,
            queryReported: 0
        });
    
        return res.json(query);
        
    }catch(err){
        console.log(err);
    }
});

router.put('/report/query/:queryAddress', async(req, res) => {
    try{
        const queryData = await db.query.findOne({
            where: { queryAddress: req.params.queryAddress }
        });

        const queryReported = queryData.queryReported+1;
        const queryPoint = 5 * queryReported;

        const putData = {
            queryPoint: queryPoint,
            queryReported: queryReported
        }

        const query = await db.query.update(putData, {
            where: { queryAddress: req.params.queryAddress }
        });

        return res.json(query);
    }catch(err){
        console.log(err);
    }
})

export default router;

import express from 'express';
import db from '../models';

const router = express.Router();

router.get('/query', async(req, res) => {
    const query = await db.query.findAll({});

    return res.json(query);
});

router.get('/query/:address', async(req, res) => {
    const query = await db.query.findOne({
        where: { queryAddress: req.params.address }
    });

    return res.json(query);
});

router.post('/query', async(req, res) => {
    const query = await db.query.create({
        queryAddress: req.body.queryAddress,
        queryComment: req.body.queryComment,
        queryContributor: req.body.queryContributor
    });

    const queryReported = await db.query.findOne({
        where: { queryAddress: query.queryAddress }
    });
    let Point;

    switch(query.queryComment){
        case 1:
            Point = 5*queryReported;
        break;

        case 2:
            Point = 10*queryReported;
        break;

        default:
            res.json('error');
        break;
    }

    return res.json(true);
});

export default router;
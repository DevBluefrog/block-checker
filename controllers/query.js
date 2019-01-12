import express from 'express';
import db from '../models';

const router = express.Router();

router.get('/query', async(req, res) => {
    const query = await db.query.findAll({});

    return res.json(query);
});

router.post('/query', async(req, res) => {
    const query = await db.query.create({
        queryAddress: req.body.queryAddress,
        queryComment: req.body.queryComment,
        queryContributor: req.body.queryContributor,
        queryPoint: req.body.queryPoint,
    });

    return res.json(query);
});

export default router;
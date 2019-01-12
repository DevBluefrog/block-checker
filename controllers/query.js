import express from 'express';
import db from '../models';

const router = express.Router();

router.get('/query', async (req, res) => {
    const query = await db.query.findAll({});

    return res.json(query);
});

router.get('/query/:queryAddress', async (req, res) => {
    try {
        db.query.count({
            where: { queryAddress: req.params.queryAddress },
        })
            .then(count => {
                if (count == 0) {
                    return res.json(false);
                } else {
                    return res.json({
                        queryAddress: req.params.queryAddress,
                        queryPoint: Math.floor(100 * (1 - 1/count)),
                        queryReported: count
                    })
                }
            })
            .catch(err => {
                return res.json(false);
            });

        if (query == null) {
            return res.json(false);
        } else {
            console.log(query)
            return res.json(query);
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/query', async (req, res) => {
    try {
        const query = await db.query.create({
            queryAddress: req.body.queryAddress,
            queryComment: req.body.queryComment,
            queryContributor: req.body.queryContributor,
        });

        return res.json(query);

    } catch (err) {
        console.log(err);
    }
});

export default router;

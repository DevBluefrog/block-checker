import express from 'express'
import db from '../models'

const router = express.Router();

router.post('/debug/', (req, res, next) => {
    console.log(req.body.domain);
    return res.render('result.html', {domain: req.body.domain});
});

export default router;
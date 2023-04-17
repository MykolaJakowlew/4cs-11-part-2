const { Router } = require('express');
const { wrapperApi } = require('../shared');

const { dishes } = require('./handlers');
const router = Router();

const priceMiddleware = ({ isOptional }) => (req, res, next) => {
    const { price } = req.body;
    const needCheck = isOptional ? price != null : true;
    if (needCheck && price <= 0) {
        return res.status(400).send({
            message: `Price must be more than 0`
        });
    }
    return next();
};

router.post('/dishes',
    priceMiddleware({ isOptional: false }),
    wrapperApi(dishes.createDish)
);

router.patch('/dishes/:_id ',
    priceMiddleware({ isOptional: true }),
    wrapperApi(dishes.updateDish));

router.get('/dishes', wrapperApi(dishes.getDishes));
router.delete('/dishes/:_id', wrapperApi(dishes.deleteDish));
module.exports = { router };
const { Router } = require('express');
const { tables } = require('./handlers');
const { wrapperApi } = require('../shared/wrapperApi');

const router = Router();

router.post('/tables', wrapperApi(tables.createTable));
router.get('/tables', wrapperApi(tables.getTables));
router.delete('/tables/:_id', wrapperApi(tables.deleteTable));
router.patch('/tables/:_id', wrapperApi(tables.updateTable));

module.exports = { router };
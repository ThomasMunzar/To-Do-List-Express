const router = require('express').Router()
const apiRoutes = require('./apiRoute')
const htmlRoutes = require('./htmlRoute')



router.get('/api', apiRoutes)
router.get('/', htmlRoutes)


module.exports = router;
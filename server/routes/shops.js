import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import shopData from '../data/shops.js'
import ShopsController from '../controllers/shops.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', ShopsController.getShops)

router.get('/search', ShopsController.searchShops)

router.get('/:slug', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../../client/public/shop.html'));
});

export default router
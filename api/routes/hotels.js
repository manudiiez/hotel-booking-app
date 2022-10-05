import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, getHotelRoom, updateHotel } from '../controllers/hotel.js'
/* ----------------------------- ERROR FUNCTION ----------------------------- */
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// CREATE
router.post('/', verifyAdmin, createHotel)

// UPDATE
router.put('/:id', verifyAdmin, updateHotel)

// DELETE
router.delete('/:id', verifyAdmin, deleteHotel)

// GET
router.get('/find/:id', getHotel)

// GET ALL
router.get('/', getAllHotel)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRoom)


export default router
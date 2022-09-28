import express from 'express'
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../controllers/hotel.js'
/* ----------------------------- ERROR FUNCTION ----------------------------- */
import { createError } from '../utils/error.js'

const router = express.Router()

// CREATE
router.post('/', createHotel)

// UPDATE
router.put('/:id', updateHotel)

// DELETE
router.delete('/:id', deleteHotel)

// GET
router.get('/:id', getHotel)

// GET ALL
router.get('/', getAllHotel)

export default router
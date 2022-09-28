import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.js'
/* ----------------------------- ERROR FUNCTION ----------------------------- */
import { createError } from '../utils/error.js'

const router = express.Router()

// UPDATE
router.put('/:id', updateUser)

// DELETE
router.delete('/:id', deleteUser)

// GET
router.get('/:id', getUser)

// GET ALL
router.get('/', getAllUser)

export default router
import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from 'cors'
/* ---------------------------------- RUTAS --------------------------------- */
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'

const app = express()
dotenv.config()

// CONEXION A MONGODB
const connect = async ( ) => {
    try {
        // await mongoose.connect(process.env.MONGO);
        await mongoose.connect('mongodb://localhost:27017/booking');
        console.log('Connected to mongoDB')
    } catch (error) {
        throw error;
    }
}

// Si esta desconectada devuelve
mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!!')
})
// Si esta conectada devuelve
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!!')
})


// middlewares: son las rutas

app.use(cors())
// Para usar cookies
app.use(cookieParser())
// Para poder usar body (json)
app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

// Next le dice a la aplicacion que se ejecute el siguiente middleware.
// Como no tiene ruta este seria el siguiente middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something went wrong!'
    return res.status(500).json({
        succest: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8800, () => {
    connect()
    console.log('Connected to backend!')
})
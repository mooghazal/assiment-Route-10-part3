
import express from 'express'
import {bootstarpDB} from './DB/connectiondb.js'
import {PORT} from './config.js'
import { authenticationController, messageController, userController } from './modules/index.js'
import { globalErrorHandling } from './middleware/index.js'
import cors from 'cors'
const app = express()
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
bootstarpDB(app, PORT)
app.use(express.json())
app.all('/', (req, res) => res.status(200).send({ message: 'Welcome to BE API' }))
app.use('/auth', authenticationController)
app.use('/message', messageController)
app.use('/user', userController)
app.all('/*dummy', (req, res) => res.status(404).send({ message: 'Invalid application routing' }))
app.use(globalErrorHandling)







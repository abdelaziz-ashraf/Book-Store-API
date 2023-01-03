const express = require('express')
require('dotenv').config()

const {notFound, errorHandler} = require('./middlewares/error.middlewares')
const logger  = require('./middlewares/logger.middlewares')

const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const authorRouter = require('./routes/author.routes')
const bookRouter = require('./routes/book.routes')


const connectToDB = require('./config/db')

// Database connection
connectToDB()

// init app
const app = express()

// Middlewares
app.use(express.json())
app.use(logger)

app.set('view engine', 'ejs')

// Routes
app.use('/api/auth', authRouter)
app.use('/api/books', bookRouter)
app.use('/api/authors', authorRouter)
app.use('/api/users', userRouter)

// Error Handler
app.use(notFound)
app.use(errorHandler)

const PORT =  process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

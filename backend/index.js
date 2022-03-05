const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
//Routes
app.use('/user',require('./routers/user'))
app.use('/vehicles',require('./routers/vehicle'))
app.use('/cart',require('./routers/cart'))

app.listen(port, () => {
  console.log(`vehiclestore app listening on port ${port}`)
})

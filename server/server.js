const express = require("express")
const app = express()
const connectDB = require("./db")
const PORT = process.env.PORT || 5000
const users = require("./routes/userApi")
const products = require("./routes/productsApi")
const auth = require("./routes/authApi")

//connect to mongodb
connectDB()

app.use(express.json({ extended: false }))

//define routes and API
app.use("/api/users", users)
app.use("/api/products", products)

//auth middleware 
app.use("/api/auth", auth)

app.get('/', (req, res) => {
  res.send("My App begins")
})

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`)
})
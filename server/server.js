const express = require("express")
const app = express()
const connectDB = require("./db")
const PORT = process.env.PORT || 5000

connectDB()

app.get('/', (req, res) => {
  res.send("My App begins")
})

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`)
})
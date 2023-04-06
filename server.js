const mongoose=require("mongoose")

const app = require('./app')
// mWzy8iAxtoljBaMU

const {DB_HOST}=require("./config")

mongoose.connect(DB_HOST)
  .then(()=>app.listen(3000))
.catch(error=>console.log(error.message))

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

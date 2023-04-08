const mongoose=require("mongoose")

// mWzy8iAxtoljBaMU
 require("dotenv").config();

const app = require('./app')

const {DB_HOST} = process.env;


mongoose.connect(DB_HOST)
  .then(() => app.listen(3000, () => {
    console.log("Database connection successful")
  }))
  .catch(error => {
    console.error('Database connection error:', error.message);
    process.exit(1);
  })


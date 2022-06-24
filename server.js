const express = require('express');
const articleRouter = require('./routes/articles');
const dotenv = require('dotenv');

// method-override To use detele, patch, or put request
const methodOverride = require('method-override');

// import database connection module
const dbConnection = require('./database/dbConnection');

// port configuration
dotenv.config({ path: '.env' });
const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Database connection
dbConnection();

app.use('/', articleRouter);

// server configuration
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

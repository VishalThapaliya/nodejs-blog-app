const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    // MongoDB connection string
    const dbConnectionURI = await mongoose.connect(
      process.env.DB_CONNECTION_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(
      `Successfully connectd to MongoDB : ${dbConnectionURI.connection.host}`
    );
  } catch (error) {
    console.log('ERROR : ', error);
    process.exit(1);
  }
};

module.exports = dbConnection;

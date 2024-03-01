const dotenv = require('dotenv');
const app = require('./app');

//dotenv.config({ path: './config.env' }); // Load environment variables from config.env file

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

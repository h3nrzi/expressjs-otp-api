require('dotenv/config');
const { connect } = require('mongoose');
const app = require('./app');

const { MONGODB_URL_LOCAL, PORT } = process.env;
const port = PORT || 3000;

connect(MONGODB_URL_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('✅ Connected To MongoBD!'))
  .catch(() => console.log('❌ Failed to Connect To MongoDB!'));

app.listen(port, () => console.log('⭐️ App running on port: ' + port));

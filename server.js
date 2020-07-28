if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = require('./server/app');
const port = process.env.PORT || 8080;

// Uncomment this code to put your site down for maintenance.
// app.use((req, res, next) => {
//   res.status(503).send('Site is down for maintenance, check back soon.');
// });

app.listen(port, () => {
  console.log(`Express server is up on port ${port}`);
});

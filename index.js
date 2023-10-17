const express = require('express');
require('dotenv').config();
const app = express();
 require('./config/db.js');
const {Notification} = require('./utils/mailer.js');

const port = 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {CronJob}  = require('cron');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./Middleware/logging.js');
app.use(express.json());
// app.use('/', logger.logging);
app.use(morgan('dev'));
// Notification();
app.use(cors());
app.use('/api', require('./routes'));
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Library API',
        version: '1.0.0',
        description: 'Library API Information',
        contact: {
          name: 'Amazing Developer'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ]
    },
    // ...
  
    apis: ["./routes/*.js"] // path to the api router dictionary
  };

//   app.use('/api', require('./routes'));
  const swaggerSpec = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Mailing Users

 const job = new CronJob('0 19 * * *', Notification);
 job.start();
// Notification();
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
    });
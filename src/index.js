import bodyParser from 'body-parser';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import routes from './routes';

const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.logstash()
    )
  })
);

// routes
app.use('/healthcheck', routes.Healthcheck);

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.logstash()
    )
  })
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`${chalk.green('✓')} Server running on port ${PORT}`)
);

import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.env.NODE_ENV === 'development' ? `.env.${process.env.NODE_ENV}` : '.env'}` });


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['*/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts']
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
export default AppDataSource;

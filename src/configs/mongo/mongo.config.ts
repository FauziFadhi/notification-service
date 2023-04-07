import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  url: process.env.DB_MONGO_URL,
}));

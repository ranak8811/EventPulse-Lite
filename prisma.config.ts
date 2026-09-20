import dotenv from 'dotenv';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

const env = dotenv.config().parsed || {};

export default definePrismaConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: {
      connection: env['DIRECT_URL'] || env['DATABASE_URL'] || '',
    },
  }),
});

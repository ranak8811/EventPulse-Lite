import { Injectable } from '@nestjs/common';
import { db } from './db.js';

@Injectable()
export class PrismaService {
  readonly db = db;

  get event() {
    return this.db.orm.public.Event;
  }
}

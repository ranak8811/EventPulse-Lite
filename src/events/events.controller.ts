import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAllEvents() {
    return this.eventsService.findAllEvents();
  }

  @Get(':id')
  findOneEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOneEvent(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';

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

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FilterEventsQueryDto } from './dto/filter-events-query.dto.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAllEvents(@Query() query: FilterEventsQueryDto) {
    return this.eventsService.findAllEvents(query);
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

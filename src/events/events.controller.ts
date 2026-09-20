import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FilterEventsQueryDto } from './dto/filter-events-query.dto.js';
import { AdminGuard } from '../common/guards/admin.guard.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAllEvents(@Query() query: FilterEventsQueryDto) {
    return this.eventsService.findAllEvents(query);
  }

  @Get(':id')
  findOneEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.findOneEvent(id);
  }

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Patch(':id/book')
  bookSeat(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.bookSeat(id);
  }

  @Patch(':id/cancel')
  @UseGuards(AdminGuard)
  cancelEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.cancelEvent(id);
  }
}

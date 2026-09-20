import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  EventStatus,
} from './interfaces/event.interface.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FilterEventsQueryDto } from './dto/filter-events-query.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllEvents(query?: FilterEventsQueryDto) {
    let collection = this.prisma.event;

    if (query?.category) {
      collection = collection.where({ category: query.category });
    }
    if (query?.status) {
      collection = collection.where({ status: query.status });
    }

    return await collection.orderBy((e) => e.createdAt.desc()).all();
  }

  async findOneEvent(id: string) {
    const event = await this.prisma.event.first({ id });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  async createEvent(createEventDto: CreateEventDto) {
    return await this.prisma.event.create({
      title: createEventDto.title,
      description: createEventDto.description,
      category: createEventDto.category,
      totalSeats: createEventDto.totalSeats,
    });
  }

  async bookSeat(id: string) {
    const event = await this.findOneEvent(id);

    if (event.status === EventStatus.CANCELLED) {
      throw new BadRequestException('Cannot book seats for a cancelled event');
    }

    if (event.status === EventStatus.COMPLETED) {
      throw new BadRequestException('Cannot book seats for a completed event');
    }

    if (event.bookedSeats >= event.totalSeats) {
      throw new BadRequestException('Event is fully booked');
    }

    return await this.prisma.event
      .where({ id })
      .update({
        bookedSeats: event.bookedSeats + 1,
      });
  }

  async cancelEvent(id: string) {
    const event = await this.findOneEvent(id);

    if (
      event.status === EventStatus.CANCELLED ||
      event.status === EventStatus.COMPLETED
    ) {
      throw new BadRequestException('Event is already cancelled or completed');
    }

    return await this.prisma.event
      .where({ id })
      .update({
        status: EventStatus.CANCELLED,
      });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Event,
  EventCategory,
  EventStatus,
} from './interfaces/event.interface.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FilterEventsQueryDto } from './dto/filter-events-query.dto.js';

@Injectable()
export class EventsService {
  private events: Event[] = [
    {
      id: 1,
      title: 'NestJS Architecture Summit 2026',
      description:
        'A deep dive into modular architecture, microservices, and clean code with NestJS.',
      category: EventCategory.TECH,
      totalSeats: 100,
      bookedSeats: 25,
      status: EventStatus.UPCOMING,
      createdAt: new Date('2026-01-15T09:00:00.000Z'),
    },
    {
      id: 2,
      title: 'Startup Founders Pitch & Network',
      description:
        'Connect with venture capitalists and pitch your innovative business ideas.',
      category: EventCategory.BUSINESS,
      totalSeats: 50,
      bookedSeats: 50,
      status: EventStatus.UPCOMING,
      createdAt: new Date('2026-02-01T10:30:00.000Z'),
    },
    {
      id: 3,
      title: 'TypeScript Advanced Types Workshop',
      description:
        'Hands-on practical workshop mastering generics, template literal types, and type gymnastics.',
      category: EventCategory.WORKSHOP,
      totalSeats: 30,
      bookedSeats: 12,
      status: EventStatus.UPCOMING,
      createdAt: new Date('2026-02-20T14:00:00.000Z'),
    },
    {
      id: 4,
      title: 'Open Air Acoustic Music Festival',
      description:
        'An evening celebrating indie artists and acoustic melodies under the night sky.',
      category: EventCategory.MUSIC,
      totalSeats: 200,
      bookedSeats: 200,
      status: EventStatus.COMPLETED,
      createdAt: new Date('2026-03-05T18:00:00.000Z'),
    },
    {
      id: 5,
      title: 'Cloud Native & DevOps Bootcamp',
      description:
        'Intensive training on Kubernetes, Docker, and CI/CD automation pipelines.',
      category: EventCategory.TECH,
      totalSeats: 80,
      bookedSeats: 15,
      status: EventStatus.CANCELLED,
      createdAt: new Date('2026-03-10T11:00:00.000Z'),
    },
  ];

  private nextEventId = this.events.length + 1;

  findAllEvents(query?: FilterEventsQueryDto) {
    let events = [...this.events];

    if (query?.category) {
      events = events.filter((event) => event.category === query.category);
    }
    if (query?.status) {
      events = events.filter((event) => event.status === query.status);
    }

    return events;
  }

  findOneEvent(id: number) {
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  createEvent(createEventDto: CreateEventDto) {
    const event: Event = {
      id: this.nextEventId++,
      title: createEventDto.title,
      description: createEventDto.description,
      category: createEventDto.category,
      totalSeats: createEventDto.totalSeats,
      bookedSeats: 0,
      status: EventStatus.UPCOMING,
      createdAt: new Date(),
    };

    this.events.push(event);

    return event;
  }

  bookSeat(id: number): Event {
    const eventIndex = this.events.findIndex((event) => event.id === id);

    if (eventIndex === -1) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    const event = this.events[eventIndex];

    if (event.status === EventStatus.CANCELLED) {
      throw new BadRequestException('Cannot book seats for a cancelled event');
    }

    if (event.status === EventStatus.COMPLETED) {
      throw new BadRequestException('Cannot book seats for a completed event');
    }

    if (event.bookedSeats >= event.totalSeats) {
      throw new BadRequestException('Event is fully booked');
    }

    const updatedEvent: Event = {
      ...event,
      bookedSeats: event.bookedSeats + 1,
    };

    this.events[eventIndex] = updatedEvent;

    return updatedEvent;
  }

  cancelEvent(id: number): Event {
    const eventIndex = this.events.findIndex((event) => event.id === id);

    if (eventIndex === -1) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    const event = this.events[eventIndex];

    if (
      event.status === EventStatus.CANCELLED ||
      event.status === EventStatus.COMPLETED
    ) {
      throw new BadRequestException('Event is already cancelled or completed');
    }

    const cancelledEvent: Event = {
      ...event,
      status: EventStatus.CANCELLED,
    };

    this.events[eventIndex] = cancelledEvent;

    return cancelledEvent;
  }
}

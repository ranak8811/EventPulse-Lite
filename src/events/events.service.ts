import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Event,
  EventCategory,
  EventStatus,
} from './interfaces/event.interface.js';

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

  findAllEvents() {
    return this.events;
  }

  findOneEvent(id: number) {
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }
}

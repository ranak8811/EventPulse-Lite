export enum EventCategory {
  TECH = 'TECH',
  BUSINESS = 'BUSINESS',
  WORKSHOP = 'WORKSHOP',
  MUSIC = 'MUSIC',
}

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Event {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  totalSeats: number;
  bookedSeats: number;
  status: EventStatus;
  createdAt: Date;
}

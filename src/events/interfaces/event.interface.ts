enum EventCategory {
  TECH,
  BUSINESS,
  WORKSHOP,
  MUSIC,
}

enum EventStatus {
  UPCOMING,
  COMPLETED,
  CANCELLED,
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

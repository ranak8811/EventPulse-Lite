import { IsEnum, IsOptional } from 'class-validator';
import { EventCategory, EventStatus } from '../interfaces/event.interface.js';

export class FilterEventsQueryDto {
  @IsOptional()
  @IsEnum(EventCategory, {
    message: 'Category must be one of: TECH, BUSINESS, WORKSHOP, MUSIC',
  })
  category?: EventCategory;

  @IsOptional()
  @IsEnum(EventStatus, {
    message: 'Status must be one of: UPCOMING, COMPLETED, CANCELLED',
  })
  status?: EventStatus;
}

import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { EventCategory } from '../interfaces/event.interface.js';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a valid string' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a valid string' })
  description: string;

  @IsNotEmpty({ message: 'Category is required' })
  @IsEnum(EventCategory, {
    message: 'Category must be one of: TECH, BUSINESS, WORKSHOP, MUSIC',
  })
  category: EventCategory;

  @IsNotEmpty({ message: 'Total seats is required' })
  @IsInt({ message: 'Total seats must be an integer number' })
  @Min(1, { message: 'Total seats must be at least 1' })
  totalSeats: number;
}

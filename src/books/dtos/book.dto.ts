import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class BookDto {
  constructor(args: Partial<BookDto>) {
    Object.assign(this, { ...args });
  }
  @Field()
  @MinLength(2, {
    message: (args) =>
      `title should contain at least ${args.constraints[0]} characters`,
  })
  @MaxLength(240, {
    message: (args) =>
      `message must not contain more than ${args.constraints[0]} characters`,
  })
  @Transform(({ value }) => value?.trim())
  title: string;

  @Field()
  @MinLength(8, {
    message: (args) =>
      `description should contain at least ${args.constraints[0]} characters`,
  })
  @MaxLength(240, {
    message: (args) =>
      `description must not contain more than ${args.constraints[0]} characters`,
  })
  @Transform(({ value }) => value?.trim())
  description: string;
}

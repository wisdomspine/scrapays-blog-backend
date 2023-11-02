import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BookDto {
  constructor(args: Partial<BookDto>) {
    Object.assign(this, { ...args });
  }
  @Field()
  title: string;

  @Field()
  description: string;
}

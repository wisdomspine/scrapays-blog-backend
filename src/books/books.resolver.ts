import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BookDto } from './dtos/book.dto';
import { HttpStatus, NotFoundException } from '@nestjs/common';

@Resolver((of) => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query((of) => Book, { name: 'book' })
  async getBook(@Args('id', { type: () => Int }) id: number) {
    const book = await this.booksService.findOne(id);
    if (book == null) {
      throw new NotFoundException({
        message: 'Book not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return book;
  }

  @Query((of) => [Book], { name: 'books' })
  getBooks(
    @Args('s', {
      type: () => String,
      description: 'Search string',
      nullable: true,
      defaultValue: '',
    })
    query: string,
  ) {
    return this.booksService.query(query);
  }

  @Mutation((of) => Book, { name: 'create' })
  async createBook(@Args('data') dto: BookDto) {
    const id = await this.booksService.create(new Book({ ...dto }));
    return this.booksService.findOne(id);
  }

  @Mutation((of) => Book, { name: 'update' })
  async updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('update') update: BookDto,
  ) {
    await this.booksService.update(id, new Book({ ...update }));
    return this.booksService.findOne(id);
  }

  @Mutation((of) => String, { name: 'delete' })
  async deleteBook(@Args('id', { type: () => Int }) id: number) {
    await this.booksService.delete(id);
    return 'Book deleted';
  }
}

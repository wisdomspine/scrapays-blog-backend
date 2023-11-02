import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly repository: Repository<Book>,
  ) {}
  query(query: string = '') {
    query = query.toLowerCase();
    return this.repository.find({
      where: [
        {
          title: Raw((title) => `LOWER(title) LIKE(:q1)`, { q1: `%${query}%` }),
        },
        {
          description: Raw((description) => `LOWER(description) LIKE(:q2)`, {
            q2: `%${query}%`,
          }),
        },
      ],
    });
  }
  create(book: Book): Promise<number> {
    return this.repository
      .insert(book)
      .then((insertResult) => insertResult.raw);
  }
  async update(id: number, update: Partial<Book>) {
    await this.repository.update(id, update);
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }
  delete(id: number) {
    return this.repository.delete(id);
  }
}

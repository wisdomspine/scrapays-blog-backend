import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    repository = {} as unknown as Repository<Book>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('query()', () => {
    beforeEach(() => {
      repository.find = jest.fn();
    });

    it('should call find', async () => {
      const query = 'hell';
      await service.query(query);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe('create()', () => {
    beforeEach(() => {
      repository.insert = jest.fn(async (x) => ({
        raw: 0,
      })) as unknown as typeof repository.insert;
    });
    it('should insert new book to database', async () => {
      const book = new Book();
      const id = await service.create(book);
      expect(id).toStrictEqual(0);
      expect(repository.insert).toHaveBeenCalledWith(book);
    });
  });

  describe('update()', () => {
    beforeEach(() => {
      repository.update = jest.fn();
    });
    it('should update book', async () => {
      const book = new Book({ id: 1, title: 'The agon of Tom Sawyer' });
      await service.update(book.id, book);
      expect(repository.update).toHaveBeenCalledWith(book.id, book);
    });
  });

  describe('findOne()', () => {
    beforeEach(() => {
      repository.findOne = jest.fn();
    });
    it('should return a match', async () => {
      await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('delete()', () => {
    beforeEach(() => {
      repository.delete = jest.fn();
    });

    it('should delete book', async () => {
      await service.delete(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});

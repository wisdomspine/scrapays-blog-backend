import { Test, TestingModule } from '@nestjs/testing';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { BookDto } from './dtos/book.dto';
import { Book } from './book.entity';

describe('BooksResolver', () => {
  let resolver: BooksResolver;
  let booksService: BooksService;
  let data: BookDto;
  const id = 30;
  const findOneResult = new Book({
    title: 'Some title',
    description: 'A test book',
  });

  beforeEach(async () => {
    data = new BookDto({
      title: 'Some title here',
      description: 'Some description here',
    });
    booksService = {
      findOne: jest.fn().mockReturnValue(findOneResult),
    } as unknown as BooksService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksResolver,
        {
          provide: BooksService,
          useValue: booksService,
        },
      ],
    }).compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getBooks()', () => {
    it('should find books', async () => {
      booksService.query = jest.fn();
      await resolver.getBooks('help');
      expect(booksService.query).toHaveBeenCalledWith('help');
    });
  });

  describe('createBook()', () => {
    beforeEach(() => {
      booksService.create = jest.fn().mockReturnValue(id);
    });

    it('should create a new book', async () => {
      await resolver.createBook(data);
      expect(booksService.create).toHaveBeenCalledWith(new Book({ ...data }));
    });

    it('should return the newly created book', async () => {
      const value = await resolver.createBook(data);
      expect(booksService.findOne).toHaveBeenCalledWith(id);
      expect(value).toEqual(findOneResult);
    });
  });

  describe('updateBook()', () => {
    beforeEach(() => {
      booksService.update = jest.fn().mockReturnValue(id);
    });
    it('should update book', async () => {
      await resolver.updateBook(id, data);
      expect(booksService.update).toHaveBeenCalledWith(id, data);
    });

    it('should return the updated book', async () => {
      const value = await resolver.updateBook(id, data);
      expect(booksService.findOne).toHaveBeenCalledWith(id);
      expect(value).toEqual(findOneResult);
    });
  });

  describe('deleteBook()', () => {
    beforeEach(() => {
      booksService.delete = jest.fn().mockReturnValue(id);
    });
    it('should delete book', async () => {
      await resolver.deleteBook(id);
      expect(booksService.delete).toHaveBeenCalledWith(id);
    });

    it('should return delete message', async () => {
      const value = await resolver.deleteBook(id);
      expect(value).toEqual('Book deleted');
    });
  });

  describe('getBook()', () => {
    it('should get book', async () => {
      const result = await resolver.getBook(id);
      expect(booksService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(findOneResult);
    });
  });
});

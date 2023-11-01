import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';
import { Environment } from './types';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let mockConfigService: ConfigService;
  const environments: Environment[] = ['development', 'production', 'test'];

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn(),
    } as unknown as ConfigService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  describe('Environment', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return a valid environment', () => {
      service.environment;
      expect(mockConfigService.get).toHaveBeenCalledWith('ENVIRONMENT');
    });
    it('should return a default environment, if non is specified', () => {
      // when environment is not specified
      mockConfigService.get = jest.fn((x) => undefined);
      expect(environments).toContain(service.environment);

      // when a wrong environment is specified
      mockConfigService.get = jest.fn((x) => 'WRONG_ENVIRONMENT');
      expect(environments).toContain(service.environment);
    });
  });

  describe('PORT', () => {
    it('should return specified port as a number', () => {
      service.port;
      expect(mockConfigService.get).toHaveBeenCalledWith('PORT');

      // specify port
      mockConfigService.get = jest.fn((x) => '2000');

      // returns port as a number
      expect(service.port).toStrictEqual(2000);
    });
  });
});

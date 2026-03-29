import { Test, TestingModule } from '@nestjs/testing';
import { EnseignantController } from './enseignant.controller';
import { EnseignantService } from './enseignant.service';

// describe('EnseignantController', () => {
//   let controller: EnseignantController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [EnseignantController],
//     }).compile();

//     controller = module.get<EnseignantController>(EnseignantController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
describe('EnseignantController', () => {
  let controller: EnseignantController;
  let service: EnseignantService;

  const mockService = {
    findAll: jest.fn(() => [{ matricule: '123', nom: 'Randria' }]),
    findOne: jest.fn((matricule: string) => ({
      matricule,
      nom: 'Randria',
    })),
    create: jest.fn((data) => data),
    remove: jest.fn((matricule: string) => ({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnseignantController],
      providers: [
        {
          provide: EnseignantService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EnseignantController>(EnseignantController);
    service = module.get<EnseignantService>(EnseignantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return one enseignant', () => {
    const result = controller.findOne('123');

    expect(result).toEqual({
      matricule: '123',
      nom: 'Randria',
    });
    expect(service.findOne).toHaveBeenCalledWith('123');
  });

  it('should create an enseignant', () => {
    const dto = { matricule: '123', nom: 'Randria' };
    const result = controller.create(dto);

    expect(result).toEqual(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';

describe('ProfileController', () => {
  let profileController: ProfileController;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            findOne: jest.fn().mockReturnValue(new Profile()),
          },
        },
      ],
    }).compile();

    profileController = module.get<ProfileController>(ProfileController);
    profileService = module.get<ProfileService>(ProfileService);
  });

  describe('findOne', () => {
    it('should return a profile by making a single call to the profile service', async () => {
      const results: Profile = await profileController.findOne('test');
      expect(results).toBeDefined();
      expect(profileService.findOne).toBeCalledTimes(1);
    });
  });
});

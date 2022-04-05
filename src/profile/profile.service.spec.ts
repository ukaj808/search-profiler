import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ProfileService', () => {
  let profileService: ProfileService;
  let profileModelMock: any;

  beforeEach(async () => {
    function mockProfileModel(dto: any) {
      this.data = dto;
      this.save = jest.fn().mockReturnValue(Promise.resolve(new Profile()));
      this.findByIdAndUpdate = jest
        .fn()
        .mockReturnValue(Promise.resolve(new Profile()));
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        {
          provide: getModelToken(Profile.name),
          useValue: mockProfileModel,
        },
      ],
    }).compile();

    profileService = module.get<ProfileService>(ProfileService);
  });

  describe('create', () => {
    it('should call the profile model save method once', async () => {
      const results: Profile = await profileService.create({
        profileId: 'test',
        type: 'test',
        category: 'test',
        searchStr: 'test',
      });
      expect(results).toBeDefined();
    });
  });
});

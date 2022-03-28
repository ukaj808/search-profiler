import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { SearchRequest } from '../search/entities/search-request.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(searchRequest: SearchRequest) {
    const createProfileDto: CreateProfileDto = new CreateProfileDto(
      searchRequest,
    );
    const createdProfile = new this.profileModel(createProfileDto);
    return createdProfile.save();
  }

  async update(request: SearchRequest) {
    return this.profileModel
      .findByIdAndUpdate(
        { _id: request.profileId },
        { $push: { searches: request.searchStr } },
      )
      .exec();
  }

  async findOne(id: string) {
    return this.profileModel.findOne({ _id: id }).exec();
  }
}

import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import {Profile} from "./entities/profile.entity";

@Injectable()
export class ProfileService {

  async create(createProfileDto: CreateProfileDto): Promise<string> {
    try {
      console.log("Successfully created profile");
      return createProfileDto.profile.id;
    } catch (err) {
      console.error("Failed to create profile");
    }
  }

  async update(id: string, s: string): Promise<void> {
    try {
      console.log("Successfully update profile");
    } catch (err) {
      console.error("Failed to update profile");
    }
  }

  async findOne(id: string): Promise<Profile> {
    return new Profile("test", "test");
  }



}

import {Profile} from "../entities/profile.entity";

export class CreateProfileDto {

    profile: Profile;

    constructor(type: string, s: string) {
        this.profile = new Profile(type, s);
    }

}

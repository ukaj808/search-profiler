import { randomUUID } from "crypto";

export class Profile {

    id: string;
    type: string;
    searches: string[];

    constructor(type: string, s: string) {
        this.id = randomUUID()
        this.searches = [s];
    }

}

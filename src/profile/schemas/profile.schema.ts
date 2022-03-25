import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document

@Schema()
export class Profile {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    searches: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

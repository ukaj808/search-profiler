import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { SearchModule } from './search/search.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProfileModule,
    SearchModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://search:admin@cluster0.vb07y.mongodb.net/search?retryWrites=true&w=majority',
    ),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

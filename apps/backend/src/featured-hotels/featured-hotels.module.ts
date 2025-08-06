import { Module } from "@nestjs/common";
import { FeaturedHotelsController } from "./featured-hotels.controller";
import { FeaturedHotelsService } from "./featured-hotels.service";
import { PrismaModule } from "../common/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FeaturedHotelsController],
  providers: [FeaturedHotelsService],
  exports: [FeaturedHotelsService],
})
export class FeaturedHotelsModule {}

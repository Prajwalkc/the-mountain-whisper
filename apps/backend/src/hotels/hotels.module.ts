import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HotelsController } from "./hotels.controller";
import { HotelsService } from "./hotels.service";
import amadeusConfig from "../config/amadeus.config";

@Module({
  imports: [ConfigModule.forFeature(amadeusConfig)],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
})
export class HotelsModule {}

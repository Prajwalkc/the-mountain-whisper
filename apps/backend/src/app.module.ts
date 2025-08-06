import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { PrismaModule } from "./common/prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ToursModule } from "./tours/tours.module";
import { DestinationsModule } from "./destinations/destinations.module";
import { HotelsModule } from "./hotels/hotels.module";
import { BookingsModule } from "./bookings/bookings.module";
import { PaymentsModule } from "./payments/payments.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { BlogModule } from "./blog/blog.module";
import { FeaturedHotelsModule } from "./featured-hotels/featured-hotels.module";

import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import appConfig from "./config/app.config";
import amadeusConfig from "./config/amadeus.config";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig, amadeusConfig],
      envFilePath: [".env.local", ".env"],
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get("THROTTLE_TTL", 60000), // 1 minute
          limit: configService.get("THROTTLE_LIMIT", 100), // 100 requests per minute
        },
      ],
    }),

    // Static file serving
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),

    // Core modules
    PrismaModule,
    AuthModule,
    UsersModule,
    ToursModule,
    DestinationsModule,
    HotelsModule,
    BookingsModule,
    PaymentsModule,
    ReviewsModule,
    BlogModule,
    FeaturedHotelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

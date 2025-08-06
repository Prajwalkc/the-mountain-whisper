import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import compression from "compression";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT", 3001);
  const nodeEnv = configService.get<string>("NODE_ENV", "development");

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: configService.get<string>("FRONTEND_URL", "http://localhost:5173"),
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix("api/v1");

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Swagger documentation (only in development)
  if (nodeEnv === "development") {
    const config = new DocumentBuilder()
      .setTitle("The Mountain Whisper API")
      .setDescription("Nepal travel platform API documentation")
      .setVersion("1.0")
      .addBearerAuth()
      .addTag("auth", "Authentication endpoints")
      .addTag("users", "User management")
      .addTag("tours", "Tour management")
      .addTag("destinations", "Destination management")
      .addTag("bookings", "Booking management")
      .addTag("payments", "Payment processing")
      .addTag("reviews", "Review system")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    console.log(
      `📚 Swagger documentation available at: http://localhost:${port}/api/docs`
    );
  }

  await app.listen(port);

  console.log(
    `🚀 The Mountain Whisper API is running on: http://localhost:${port}/api/v1`
  );
  console.log(`🌍 Environment: ${nodeEnv}`);
}

bootstrap().catch((error) => {
  console.error("❌ Error starting server:", error);
  process.exit(1);
});

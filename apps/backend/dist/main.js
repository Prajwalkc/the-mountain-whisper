"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const compression_1 = require("compression");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ["error", "warn", "log", "debug", "verbose"],
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get("PORT", 3001);
    const nodeEnv = configService.get("NODE_ENV", "development");
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: configService.get("FRONTEND_URL", "http://localhost:5173"),
        credentials: true,
    });
    app.setGlobalPrefix("api/v1");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    if (nodeEnv === "development") {
        const config = new swagger_1.DocumentBuilder()
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
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("api/docs", app, document, {
            swaggerOptions: {
                persistAuthorization: true,
            },
        });
        console.log(`📚 Swagger documentation available at: http://localhost:${port}/api/docs`);
    }
    await app.listen(port);
    console.log(`🚀 The Mountain Whisper API is running on: http://localhost:${port}/api/v1`);
    console.log(`🌍 Environment: ${nodeEnv}`);
}
bootstrap().catch((error) => {
    console.error("❌ Error starting server:", error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map
import { AppModule } from "@/app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

const PORT = process.env.PORT ?? 3000;

const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe({ transform: true }));
await app.listen(PORT).then(() => {
  Logger.log(`Server running on http://localhost:${PORT}`, "Main");
});

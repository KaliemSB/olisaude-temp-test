import { AppModule } from "@/app.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

const PORT = process.env.PORT ?? 3000;

const app = await NestFactory.create(AppModule);
await app.listen(PORT).then(() => {
  Logger.log(`Server running on http://localhost:${PORT}`, "Main");
});

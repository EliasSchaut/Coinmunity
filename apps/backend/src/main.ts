import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import type { LogtoExpressConfig } from '@logto/express';
import { handleAuthRoutes } from '@logto/express';
import session from 'express-session';

async function bootstrap() {
  const config: LogtoExpressConfig = {
    endpoint: process.env.LOGTO_ENDPOINT!,
    appId: process.env.NEST_LOGTO_APP_ID!,
    appSecret: process.env.NEST_LOGTO_APP_SECRET!,
    baseUrl: process.env.NEST_BASE_URL!,
  };

  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.NEST_LOGTO_SESSION_SECRET!,
      cookie: { maxAge: Number(process.env.NEST_COOKIE_AGE) },
    }),
  );
  app.use(handleAuthRoutes(config));
  await app.listen(process.env.NEST_PORT ?? 3000);
}

bootstrap();

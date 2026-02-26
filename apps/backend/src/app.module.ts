import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvValidationSchema } from '@/common/validation/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
    }),
  ],
})
export class AppModule {}

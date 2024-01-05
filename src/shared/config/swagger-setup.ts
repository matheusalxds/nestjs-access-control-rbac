import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

import { EnvService } from '@/shared/env/env.service';

export const swaggerSetup = (app: NestExpressApplication, env: EnvService) => {
  const config = new DocumentBuilder()
    .setTitle(env.get('npm_package_name'))
    .setDescription(env.get('npm_package_description'))
    .setVersion(env.get('npm_package_version'))
    .build();

  const theme = new SwaggerTheme('v3');
  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  };

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(env.get('SWAGGER_ROUTE'), app, document, options);
};

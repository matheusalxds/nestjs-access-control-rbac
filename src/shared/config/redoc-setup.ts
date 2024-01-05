import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

import { EnvService } from '@/shared/env/env.service';

export const redocSetup = async (app, env: EnvService) => {
  const config = new DocumentBuilder()
    .setTitle(env.get('npm_package_name'))
    .setDescription(env.get('npm_package_description'))
    .setVersion(env.get('npm_package_version'))
    .build();

  const redocOptions: RedocOptions = {
    title: 'RBAC',
    logo: {
      url: 'https://i0.wp.com/portalgsi.com.br/wp-content/uploads/2017/09/RBAC-1.png?fit=800%2C445&ssl=1',
      backgroundColor: '#F0F0F0',
      altText: 'RBAC',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: true,
    hideHostname: false,
    auth: {
      enabled: true,
      user: 'admin',
      password: '123',
    },
  };

  const document = SwaggerModule.createDocument(app, config);

  // SwaggerModule.setup(env.get('REDOC_ROUTE'), app, document, options);
  await RedocModule.setup(env.get('REDOC_ROUTE'), app, document, redocOptions);
};

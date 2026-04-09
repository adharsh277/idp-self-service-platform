import express, { Router } from 'express';
import { coreServices, createBackendPlugin } from '@backstage/backend-plugin-api';

export default createBackendPlugin({
  pluginId: 'create-service',
  register(env) {
    env.registerInit({
      deps: {
        rootHttpRouter: coreServices.rootHttpRouter,
        logger: coreServices.logger,
      },
      async init({ rootHttpRouter, logger }) {
        const router = Router();
        router.use(express.json());

        router.post('/', async (req, res) => {
          const { serviceName, environment } = req.body ?? {};

          if (!serviceName || !environment) {
            return res.status(400).json({
              status: 'error',
              message: 'Missing fields',
            });
          }

          logger.info(
            `Service ${serviceName} will be created in ${environment}`,
          );

          return res.json({
            status: 'success',
            message: `Service ${serviceName} will be created in ${environment}`,
          });
        });

        rootHttpRouter.use('/create-service', router);
      },
    });
  },
});
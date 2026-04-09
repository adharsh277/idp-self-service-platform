import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  createTemplateAction,
  scaffolderActionsExtensionPoint,
} from '@backstage/plugin-scaffolder-node';

const createHttpBackstageRequestAction = () =>
  createTemplateAction({
    id: 'http:backstage:request',
    description: 'Calls a Backstage backend endpoint from a scaffolder task.',
    schema: {
      input: {
        method: z => z.string().default('GET'),
        path: z => z.string(),
        headers: z => z.record(z.string()).optional(),
        body: z => z.any().optional(),
      },
      output: {
        status: z => z.number(),
        body: z => z.any().optional(),
      },
    },
    async handler(ctx) {
      const method = ctx.input.method.toUpperCase();
      const path = ctx.input.path.startsWith('/')
        ? ctx.input.path
        : `/${ctx.input.path}`;
      const url = `http://127.0.0.1:7007${path}`;

      const headers: Record<string, string> = {
        ...(ctx.input.headers ?? {}),
      };

      let body: string | undefined;
      if (ctx.input.body !== undefined) {
        body = JSON.stringify(ctx.input.body);
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json';
        }
      }

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      const text = await response.text();
      let parsedBody: unknown = text;
      try {
        parsedBody = text ? JSON.parse(text) : undefined;
      } catch {
        // Keep plain text response when body is not JSON.
      }

      ctx.output('status', response.status);
      ctx.output('body', parsedBody);

      if (!response.ok) {
        throw new Error(
          `Request to ${path} failed with ${response.status}: ${text}`,
        );
      }
    },
  });

const scaffolderModuleHttpBackstageRequest = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'http-backstage-request',
  register(reg) {
    reg.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
      },
      async init({ scaffolder }) {
        scaffolder.addActions(createHttpBackstageRequestAction());
      },
    });
  },
});

export default scaffolderModuleHttpBackstageRequest;

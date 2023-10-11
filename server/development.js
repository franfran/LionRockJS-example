import 'dotenv/config';
import {Central} from '@lionrockjs/central';
import Server from './Server.mjs';

Central.ENV = Central.ENV_DEVE;

(async () => {
  const s = new Server(process.env.PORT ?? 8000);
  await s.setup();
//  require('@kohanajs/mod-route-debug');
  await s.listen();
})();

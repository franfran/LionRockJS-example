import { Central } from 'lionrockjs';

Central.initConfig(new Map([
  ['site', (await import('./config/site.mjs')).default],
]));
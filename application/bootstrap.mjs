import { Central } from '@lionrockjs/central';

Central.initConfig(new Map([
  ['site', await import('./config/site.mjs')],
]));
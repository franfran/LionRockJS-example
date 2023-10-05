import * as url from 'node:url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');

import path from 'node:path';
import {Central} from 'lionrockjs';

export default class Server {
  constructor(port = 8001) {
    this.port = port;
  }

  async setup() {
    // setup LionRockJS path constants
    await Central.init({
      EXE_PATH:  path.normalize(__dirname),
      APP_PATH:  path.normalize(`${__dirname}/../application`),
      VIEW_PATH: path.normalize(`${__dirname}/../views`),
      MOD_PATH:  path.normalize(`${__dirname}/../application/modules`)
    });

    await import('../application/routes.mjs');

    this.adapter = Central.config.site?.platform?.adapter || {setup: async ()=>({listen: port => console.log(`app listening at ${port}`)})};
    this.app = await this.adapter.setup();
  }

  async listen() {
    console.log(Central.ENV, Central.config);
    await this.app.listen(this.port);
    console.log(`app listening at ${this.port}`);
  }
}
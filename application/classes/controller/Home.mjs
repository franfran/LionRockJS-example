import {Controller} from '@lionrockjs/mvc';
import {ControllerMixinView, Central, ControllerMixinDatabase} from '@lionrockjs/central';
import {ControllerMixinSession} from '@lionrockjs/mod-session';
import fs from 'node:fs';
import path from 'node:path';

export default class ControllerHome extends Controller{
  static mixins = [ControllerMixinView, ControllerMixinDatabase, ControllerMixinSession];
  constructor(request) {
    super(request);
    this.state.get(ControllerMixinDatabase.DATABASE_MAP)
      .set('session', path.normalize(Central.APP_PATH + '/../database/session.sqlite'));
  }

  async action_index() {
    const request = this.state.get(Controller.STATE_REQUEST);
    ControllerMixinView.setTemplate(this.state, 'templates/page', {
      ipcountry: request.headers['cf-ipcountry'] || 'HK'
    });
    const session = this.state.get(Controller.STATE_REQUEST).session;
    session.name = "lorem lipsum";
//    this.state.get(Controller.STATE_COOKIES).push({name:"hello", value:"world", options: Central.config.cookie.options});
  }

  async action_page(){
    const data = fs.readFileSync(Central.VIEW_PATH + '/templates/page.json', 'utf8');

    ControllerMixinView.setTemplate(this.state, 'templates/home', {
      data
    });
  }
}
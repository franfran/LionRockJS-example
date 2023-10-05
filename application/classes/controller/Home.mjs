import {Controller} from '@lionrockjs/mvc';

export default class ControllerHome extends Controller{
  async action_index() {
    this.body = 'Hello World!';
  }
}
import { Controller } from '@lionrockjs/mvc';
import { ControllerAdmin } from '@lionrockjs/mod-admin';
import { Central, ORM, ControllerMixinDatabase } from '@lionrockjs/central';

const Lead = await ORM.import('Lead');
import HelperRSVP from '../../helper/RSVP.mjs';

export default class ControllerAdminRSVP extends ControllerAdmin {
  constructor(request) {
    super(request, Lead, {
      roles: new Set(['staff', 'moderator']),
      databases: new Map([
        ['guest', Central.config.setup.databaseFolder+'/guest.sqlite'],
        ['mail', Central.config.setup.databaseFolder+'/mail.sqlite']
      ]),
      templates: new Map([
        ['index', 'templates/admin/guests/index'],
        ['read', 'templates/admin/guests/read'],
        ['edit', 'templates/admin/guests/read'],
      ]),
      database: 'guest',
      pagesize: 50,
    });
  }

  async action_index() {}

  async action_send_email(){
    const query = this.state.get(this.constructor.STATE_QUERY);
    console.log(query);

    const databases = this.state.get(ControllerMixinDatabase.DATABASES);
    const database = databases.get('guest');
    const instance = await ORM.factory(Lead, this.state.get(this.constructor.STATE_PARAMS).id, {database});

    const helperRegister = new HelperRSVP(
      databases.get('guest'),
      databases.get('mail'),
      this.state.get(Controller.STATE_CLIENT_IP),
      this.state.get(Controller.STATE_HOSTNAME)
    )

    await helperRegister.sendRSVP(instance, Central.config.edm);
    instance.rsvp_code = "111.111.111";
    await instance.write();

    await this.redirect(query.cp || '/admin/rsvp/');
  }

}

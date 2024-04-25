import path from 'node:path';
import { Central, ORM } from '@lionrockjs/central';
import { Mail } from '@lionrockjs/mod-mail';
import { MailAdapterAWS } from "@lionrockjs/adapter-mail-aws";
import { ORMAdapterSQLite } from "@lionrockjs/adapter-database-better-sqlite3";

const Notification = await ORM.import('Notification');

export default class HelperRSVP {
  constructor(leadDB, mailDB, clientIP, landing) {
    this.leadDB = leadDB;
    this.helperMail = new Mail({
      database: mailDB,
      ormAdapter : ORMAdapterSQLite,
      adapter : MailAdapterAWS,
      templateFolder : path.normalize(Central.config.edm.mail.templatePath)
    });
    this.clientIP = clientIP;
    this.landing = landing;
  }

  async sendReminder(instance, config){
    const language = instance.language;
    const userEmail = instance.email;
    const sender  = config.mail.reminder.sender;
    const subject = config.mail.reminder.subject.get(language);
    const text    = config.mail.reminder.text.get(language);
    const html    = config.mail.reminder.html.get(language);

    const title = new Map([
      ["en", new Map([["mr", "Mr."], ["mrs", "Mrs."], ["ms", "Ms."]])],
      ["zh-hans", new Map([["mr", "先生"], ["mrs", "太太"], ["ms", "女士"]])],
      ["zh-hant", new Map([["mr", "先生"], ["mrs", "太太"], ["ms", "女士"]])],
    ])

    const tokens = Object.assign(
      {
        domain: this.landing,
        language: language,
      },
      instance,
      {
        email: userEmail.replaceAll('.', '<span>.</span>'),
        title: title.get(language).get(instance.title.toLowerCase()),
      });

    const result = await this.helperMail.send(subject, text, sender, userEmail, {
      bcc: config.mail.bcc,
      html,
      tokens
    });

    await this.addNotification('REMINDER', result, instance.id);
  }

  async sendRSVP(instance, config){
    const language = instance.language;
    const userEmail = instance.email;
    const sender  = config.mail.rsvp.sender;
    const subject = config.mail.rsvp.subject.get(language);
    const text    = config.mail.rsvp.text.get(language);
    const html    = config.mail.rsvp.html.get(language);
    const attachments = config.mail.rsvp.attachments.get(language);

    const title = new Map([
      ["en", new Map([["mr", "Mr."], ["mrs", "Mrs."], ["ms", "Ms."]])],
      ["zh-hans", new Map([["mr", "先生"], ["mrs", "太太"], ["ms", "女士"]])],
      ["zh-hant", new Map([["mr", "先生"], ["mrs", "太太"], ["ms", "女士"]])],
    ])

    const tokens = Object.assign(
      {
        domain: this.landing,
        language: language,
      },
      instance,
      {
        email: userEmail.replaceAll('.', '<span>.</span>'),
        title: title.get(language).get(instance.title.toLowerCase()) ?? '',
      });

    console.log(config.mail.bcc);
    const result = await this.helperMail.send(subject, text, sender, userEmail, {
      cc: instance.cc.split(','),
      bcc: config.mail.bcc,
      html,
      tokens,
      attachments
    });

    await this.addNotification('RSVP', result, instance.id);
  }

  async addNotification(name, result, leadID){
    const note = ORM.create(Notification, {database: this.leadDB});
    note.name = name;
    note.status = JSON.stringify(result);
    if(result.id) note.message_id = result.id.replace('<', '').replace('>', '');
    note.lead_id = leadID;
    await note.write();
  }
}
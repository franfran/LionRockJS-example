import { Central } from '@lionrockjs/central';

export default {
  dbMail: `${Central.EXE_PATH}/../database/mail.sqlite`,

  aws: {
    credentialsPath : Central.APP_PATH + '/config/credentials',
    profile              : 'default',
    region               : 'ap-southeast-1',
    configurationSetName : "default",
    dynamoDB             : "SES_SAMPLE",
    project              : `example-dev`,
  },
};

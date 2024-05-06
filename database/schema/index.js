import url from "node:url";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');

import path from 'node:path';
import {build} from '@lionrockjs/start';

build(
  `${__dirname}/session.graphql`,
  ``,
  `${__dirname}/exports/session.sql`,
  `${__dirname}/../default/session.sqlite`,
  path.normalize(`${__dirname}/classes/model`),
)

build(
  `${__dirname}/admin.graphql`,
  `${__dirname}/admin.mjs`,
  `${__dirname}/exports/admin.sql`,
  `${__dirname}/../default/admin.sqlite`,
  path.normalize(`${__dirname}/classes/model`),
)

build(
  `${__dirname}/lead_info.graphql`,
  `${__dirname}/lead_info.mjs`,
  `${__dirname}/exports/lead_info.sql`,
  `${__dirname}/../default/guest/lead_info.sqlite`,
  path.normalize(`${__dirname}/classes/guest/model`),
)

build(
  `${__dirname}/lead.graphql`,
  `${__dirname}/lead.mjs`,
  `${__dirname}/exports/lead.sql`,
  `${__dirname}/../default/guest/lead.sqlite`,
  path.normalize(`${__dirname}/classes/guest/model`),
)

build(
  `${__dirname}/lead_action.graphql`,
  ``,
  `${__dirname}/exports/lead_action.sql`,
  `${__dirname}/../default/guest/lead_action.sqlite`,
  path.normalize(`${__dirname}/classes/guest/model`),
)

build(
  `${__dirname}/mail.graphql`,
  ``,
  `${__dirname}/exports/mail.sql`,
  `${__dirname}/../default/mail.sqlite`,
  path.normalize(`${__dirname}/classes/mail/model`),
)
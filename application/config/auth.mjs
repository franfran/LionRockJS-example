import path from 'node:path';
import {Central} from '@lionrockjs/central';
import {IdentifierPassword} from '@lionrockjs/adapter-auth-password';

export default {
  databasePath: path.normalize(Central.EXE_PATH + '/../database'),
  userDatabase: 'admin.sqlite',
  databaseMapName : "admin",
  identifiers: [IdentifierPassword],
  destination: 'admin',
};

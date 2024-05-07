import { Central, ControllerMixinDatabase, ORM } from '@lionrockjs/central';
import { View } from '@lionrockjs/mvc';
import AdapterViewLiquid, { LiquidView } from '@lionrockjs/adapter-view-liquidjs';
View.DefaultViewClass = LiquidView;

import { ORMAdapterSQLite, DatabaseAdapterBetterSQLite3 } from "@lionrockjs/adapter-database-better-sqlite3";
ORM.defaultAdapter = ORMAdapterSQLite;
ControllerMixinDatabase.defaultAdapter = DatabaseAdapterBetterSQLite3;

await (async () => {
  Central.addModules([
    AdapterViewLiquid,
    await import('@lionrockjs/mixin-form'),
    await import('@lionrockjs/mixin-session'),
    await import('@lionrockjs/mod-auth'),
    await import('@lionrockjs/adapter-auth-password'),
    await import('@lionrockjs/mod-admin'),
    await import('@lionrockjs/adapter-mail-aws'),
    await import('@lionrockjs/mod-cold-leads'),
    await import('@lionrockjs/mod-admin-rsvp')
  ]);
})();

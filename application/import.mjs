import { Central, ControllerMixinDatabase, ORM } from '@lionrockjs/central';
import { View } from '@lionrockjs/mvc';
import AdapterViewLiquid, { LiquidView } from '@lionrockjs/adapter-view-liquid';
View.DefaultViewClass = LiquidView;

import { ORMAdapterSQLite, DatabaseAdapterBetterSQLite3 } from "@lionrockjs/adapter-database-better-sqlite3";
ORM.defaultAdapter = ORMAdapterSQLite;
ControllerMixinDatabase.defaultAdapter = DatabaseAdapterBetterSQLite3;

await (async () => {
  Central.addModules([
    AdapterViewLiquid,
    await import('@lionrockjs/mod-session'),
  ]);
})();

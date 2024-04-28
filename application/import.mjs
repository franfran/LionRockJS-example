import { Central } from '@lionrockjs/central';
import { View } from '@lionrockjs/mvc';
import AdapterViewLiquid, { LiquidView } from '@lionrockjs/adapter-view-liquidjs';
View.DefaultViewClass = LiquidView;

await (async () => {
  Central.addModules([
    AdapterViewLiquid,
  ]);
})();

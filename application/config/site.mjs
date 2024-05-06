import { ServerAdapterNodeHTTP } from "@lionrockjs/platform-web-node-http";
import { Central } from "@lionrockjs/central";

export default {
  platform:{
    adapter: ServerAdapterNodeHTTP
  },
  databaseFolder: `${Central.APP_PATH}/../database`,
  notFound: '/pages/404',
};
import { ServerAdapterFastify as ServerAdapter } from "@lionrockjs/platform-web-fastify";
import { Central } from "@lionrockjs/central";

export default {
  platform:{
    adapter: ServerAdapter
  },
  databaseFolder: `${Central.APP_PATH}/../database`,
  notFound: '/pages/404',
};
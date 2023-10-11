import { RouteList } from '@lionrockjs/central';

RouteList.add('/', 'controller/Home');
RouteList.add('/pages/:slug', 'controller/Home', 'page');
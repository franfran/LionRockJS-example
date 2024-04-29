import { RouteList } from '@lionrockjs/central';

RouteList.add('/', 'controller/Home');
RouteList.add('/submit', 'controller/Home', 'form_post', 'POST');
RouteList.add('/pages/:slug', 'controller/Home', 'page');
import {Central} from '@lionrockjs/central';

export default {
  debug: (Central.ENV !== Central.ENV_PROD),
  serve_static_file: false,
}
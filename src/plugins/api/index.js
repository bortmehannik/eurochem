import axios from '@/plugins/axios';

import auth from './auth';
import institutes from './institutes';
import user from './user';

export default {
  auth: auth(axios),
  institutes: institutes(axios),
  user: user(axios),
};

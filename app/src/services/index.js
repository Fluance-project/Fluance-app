import UserService from './user'
import HostService from './host'
import config from '../config';


export default {
    user: new UserService(config),
    host: new HostService(config)
}
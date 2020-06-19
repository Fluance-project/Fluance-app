import config from '../../config';
import AccountService from './accounts'

export default {
    account: new AccountService(config)
}
import config from '../../config';
import AccountService from './accounts'
import EquipmentService from './equipment';

export default {
    account: new AccountService(config),
    equipment: new EquipmentService(config),
}
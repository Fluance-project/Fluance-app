import config from '../../config';
import AccountService from './accounts'
import EquipmentService from './equipment';
import MemberService from './membre';
import TaskService from './task';

export default {
    account: new AccountService(config),
    equipment: new EquipmentService(config),
    member: new MemberService(config),
    task: new TaskService(config),
}
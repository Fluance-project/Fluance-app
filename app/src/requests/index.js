import UserApi from './user/index'

const config = {
    url : "http://localhost:3003"
}


export default {
    user: new UserApi(config)
}
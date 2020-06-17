import services from '../../services';

export default function guest ({ next }){
    if(services.user.getPersisted()){
        return next({
           name: 'Connexion',
           path: '/login'
        })
    }
   
    return next()
   }
import services from '../../services';

export default function guest ({ next }){
    if(services.user.getPersisted()){
        return next({
           name: 'Accueil'
        })
    }
   
    return next()
   }
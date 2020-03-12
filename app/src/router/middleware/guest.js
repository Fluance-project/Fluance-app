import services from '../../services';

export default function guest ({ next, store }){
    if(services.user.getPersisted()){
        return next({
           name: 'Accueil'
        })
    }
   
    return next()
   }
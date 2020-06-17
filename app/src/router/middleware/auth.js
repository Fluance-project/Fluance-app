import services from '../../services';

export default function auth ({ next, store }){
    if(!services.user.getPersisted()){
        return next({
           name: 'Connexion'
        })
    } else {
       if(!store.state.user.userData){
            return next({
                name: 'Tableau-de-bord'
            });
       }
    }
   
    return next()
   }
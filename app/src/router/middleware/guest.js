export default function guest ({ next, store }){
    if(store.getters.auth.loggedIn){
        return next({
           name: 'Tableau de bord'
        })
    }
   
    return next()
   }
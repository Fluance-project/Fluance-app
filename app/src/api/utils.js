import state from '../store/'
export default {
  getStored() {
    return state.getters['app/getJwt'];
  },
  
  fetchToken() {
    const local = this.getStored().jwt;
    return 'Bearer '.concat(local);
  }
}
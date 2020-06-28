import state from '../store/'
export default {
  getStored() {
    return state.getters['app/getJwt'];
  },
  
  fetchToken() {
    const local = this.getStored();
    return 'Bearer '.concat(local);
  }
}

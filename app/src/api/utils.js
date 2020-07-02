export default {
  getStored() {
    return JSON.parse(window.localStorage.getItem('fluance'));
  },
  
  fetchToken() {
    const local = this.getStored();
    console.log(local);
    return 'Bearer '.concat(local);
  }
}
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
})],
  state:{
    user:{
      personID:'default',
      personName:'default'
    }
  },
  getters:{
    UserID: (state) => state.user.personID,
    UserName: (state) => state.user.personName
  },
  mutations:{
    changeID (state,payload){
      state.user.personID = payload
    },
    changeName(state,payload){
      state.user.personName = payload
    }
  }
})
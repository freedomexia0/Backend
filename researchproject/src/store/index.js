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
      personName:'default',
      admin: 'test!!!!'
    }
  },
  getters:{
    UserID: (state) => state.user.personID,
    UserName: (state) => state.user.personName,
    Authority: (state) => state.user.admin
  },
  mutations:{
    changeID (state,payload){
      state.user.personID = payload
    },
    changeName(state,payload){
      state.user.personName = payload
    },
    changeAuthority(state,payload){
      state.user.admin = payload
    }
  }
})
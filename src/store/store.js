import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: '',
        password: ''
    },
    getters: {},
    mutations: {
        login (state, payload) {
            state.username = payload.name;
            state.password = payload.pass
        },
        logout (state) {
            state.username = undefined;
            state.password = undefined
        }
    },
    actions: { 
        login (context, payload) {
            context.commit('login', payload)
        },
        logout (context) {
            context.commit('logout')
        }
    }
})
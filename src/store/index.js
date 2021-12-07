import { createStore } from 'vuex';

import axios from '../axios'


const store = createStore({
    state: () => ({
        user: {},

    }),
    getters: {
        memories(state) {
            return state.memories
        },
        memory(state) {
            return (id) => {
                return state.memories.find((memory) => memory.id == id)
            };
        },
        user(state) {
            return state.user;
        }
    },
    actions: {

        async updateUser({ commit }) {

            try {
                if (localStorage.getItem("token")) {
                    // console.log(localStorage.getItem("token"))
                    // const response = await axios.get(localStorage.getItem("user_type") == "customer" ? 'user/v1/details' :
                    //     localStorage.getItem("user_type") == "delivery" ? 'delivery_man/v1/details' : 'admin/v1/details');
                    const response = await axios.get('user/v1/dashboard');
                    commit('SET_USER', response.data)
                    console.log(response.data)
                        // console.log(response)
                    return response.data
                }
            } catch (error) {
                commit('SET_USER', null)
                localStorage.removeItem("token");
                localStorage.removeItem("user_type");
            }
        }

    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },

    }
});

export default store;
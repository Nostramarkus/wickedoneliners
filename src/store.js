import Vue from 'vue'
import Vuex from 'vuex'
import OnelinerServices from '@/services/OnelinerServices';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loading: true,
		loggedIn: false,
		oneliners: []
	},
	mutations: {
		SET_LOADING(state, boolean) {
			state.loading = boolean
		},
		SET_ONELINERS(state, oneliners) {
			state.oneliners = oneliners
		},
		SET_LOGGED_IN(state, boolean) {
			state.loggedIn = boolean
		}
	},
	actions: {
		fetchOneliners({ commit }, data) {
			commit('SET_LOADING', true);
			OnelinerServices.getOneliners(data)
				.then(res => {
					commit('SET_ONELINERS', res.data);
				})
				.catch(error => {
					Vue.noty.error("Network error...");
				})
				.finally(() => {
					commit('SET_LOADING', false);
				});
		},
		login({ commit }) {
			commit('SET_LOGGED_IN', true);
		},
		logout({ commit }, data) {
			commit('SET_LOGGED_IN', false);
			OnelinerServices.deleteToken(data)
				.catch(error => {
					Vue.noty.error("Network error...");
				})
		},
		deleteOneliner({ commit }, id) {
			let oneliners = this.state.oneliners;
			let removeIndex = oneliners.map(onliner => onliner.id).indexOf(id)
			let newOneliners = oneliners.splice(removeIndex, 1)
			commit('SET_LOGGED_IN', newOneliners);
		}
	}
})

import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js'
import appStatus from './modules/appStatus'
import getters from './getters.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  modules: {
    user,
    appStatus
  },
  getters,
  strict: process.env.DEV
})

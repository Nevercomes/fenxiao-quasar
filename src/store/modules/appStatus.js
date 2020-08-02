const appStatus = {
  state: {
    loginDialog: false
  },
  mutations: {
    showLoginDialog (state) {
      state.loginDialog = true
    },
    hideLoginDialog (state) {
      state.loginDialog = false
    }
  }
}

export default appStatus

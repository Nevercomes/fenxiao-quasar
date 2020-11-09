const sign = {
  state: {
    schoolName: '',
    provinceCode: ''
  },
  mutations: {
    setSchoolName (state, schoolName) {
      state.schoolName = schoolName
    },
    setProvinceCode (state, provinceCode) {
      state.provinceCode = provinceCode
    }
  }
}

export default sign

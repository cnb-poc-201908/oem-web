import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initialState = () => ({
  mappingType: '',
  weightList: {}
});

export default new Vuex.Store({
  state: initialState(),
  mutations: {
    setMappingType(state, value) {
      state.mappingType = value;
    },
    setWeightList(state, value) {
      state.weightList = value;
    }
  },
  actions: {

  }
})

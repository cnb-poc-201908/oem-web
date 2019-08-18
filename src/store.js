import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initialState = () => ({
  mappingType: '',
  weightList: {},
  dealerId: '',
  sankeyData: [],
  sankeyLinks: []
});

export default new Vuex.Store({
  state: initialState(),
  mutations: {
    setMappingType(state, value) {
      state.mappingType = value;
    },
    setWeightList(state, value) {
      state.weightList = value;
    },
    setDealerId(state, value) {
      state.dealerId = value;
    },
    setSankeyData(state, value) {
      state.sankeyData = value;
    },
    setSankeyLinks(state, value) {
      state.sankeyLinks = value;
    }
  },
  actions: {

  }
})

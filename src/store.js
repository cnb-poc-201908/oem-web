import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initialState = () => ({
  mappingType: '',
  weightList: {},
  dealerId: '',
  sankeyData: [],
  sankeyLinks: [],
  material: '',
  completeMapping: '',
  optimalMapping: '',
  recommendMapping: '',
  dealerReportList: [],
  modelsOemList: {}
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
    },
    setMaterial(state, value) {
      state.material = value;
    },
    setCompleteMapping(state, value) {
      state.completeMapping = value;
    },
    setOptimalMapping(state, value) {
      state.optimalMapping = value;
    },
    setRecommendMapping(state, value) {
      state.recommendMapping = value;
    },
    setDealerReportList(state, value) {
      state.dealerReportList = value;
    },
    setModelsOemList(state, value) {
      state.modelsOemList = value;
    }
  },
  actions: {

  }
})

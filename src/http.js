import axios from 'axios'

export default {
  DATA_URL: "http://bmwpoc.cdkapps.cn:30090",
  getData() {
    return axios.get(`${this.DATA_URL}/?results=50`);
  },
  getDetail(id) {
    return axios.get(`${this.DATA_URL}`);
  },
  getModels(dealerId) {
    return axios.get(`${this.DATA_URL}/model/models/${dealerId}`);
  },
  putModels(dealerId, weightList) {
    return axios.put(`${this.DATA_URL}/model/models/${dealerId}`, weightList);
  },
  postModels(dealerId, body) {
    return axios.post(`${this.DATA_URL}/model/models/${dealerId}`, body);
  },
  getSankey(matchStatus) {
    return axios.get(`${this.DATA_URL}/order/orders/orderflows?matchStatus=${matchStatus}`);
  },
  getReport() {
    return axios.get(`${this.DATA_URL}/engine/api/v1/report`);
  },
  getDealerReport() {
    return axios.get(`${this.DATA_URL}/engine/api/v1/dealerreport`);
  }


}

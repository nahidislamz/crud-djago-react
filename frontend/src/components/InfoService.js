import axios from "axios";
const API_URL = "http://localhost:8000";

export default class InfoService {
  getInfos() {
    const url = `${API_URL}/api/info/`;
    return axios.get(url).then((response) => response.data);
  }

  getInfoById(id) {
    const url = `${API_URL}/api/info/?id=${id}`;
    return axios.get(url).then((response) => response.data);
  }

  deleteInfo(id) {
    const url = `${API_URL}/api/info/?id=${id}`;
    return axios.delete(url).then((response) => response.data);
  }

  createInfo(info) {
    const url = `${API_URL}/api/info/`;
    return axios.post(url, info);
  }

  updateInfo(info) {
    const url = `${API_URL}/api/info/`;
    return axios.put(url, info).then((response) => response.data);
  }
}

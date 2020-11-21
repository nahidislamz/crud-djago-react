import axios from "axios";
const API_URL = "http://localhost:8000";

export default class InfoService {
  async getInfos() {
    const url = `${API_URL}/api/info/`;
    const response = await axios.get(url);
    return response.data;
  }

  async getInfoById(id) {
    const url = `${API_URL}/api/info/?id=${id}`;
    const response = await axios.get(url);
    return response.data;
  }

  async deleteInfo(id) {
    const url = `${API_URL}/api/info/?id=${id}`;
    const response = await axios.delete(url);
    return response.data;
  }

  createInfo(info) {
    const url = `${API_URL}/api/info/`;
    return axios.post(url, info);
  }

  async updateInfo(info) {
    const url = `${API_URL}/api/info/`;
    const response = await axios.put(url, info);
    return response.data;
  }
}

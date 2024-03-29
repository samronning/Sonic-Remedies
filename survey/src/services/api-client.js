import axios from "axios";

const { REACT_APP_LOCALHOST, REACT_APP_API_PORT } = process.env;
const endpoint = REACT_APP_LOCALHOST
  ? `http://localhost:${REACT_APP_API_PORT}`
  : `https://sonicremedies.net:${REACT_APP_API_PORT}`;

const onError = (err) => {
  console.error(err.message);
};
const API = {
  postToken() {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
  },
  refreshLogin() {
    if (
      window.confirm(
        "Your session is about to expire. Would you like to extend it another 30 minutes?"
      )
    ) {
      axios
        .get(endpoint + "/login/refresh")
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data);
          axios.defaults.headers.common["authorization"] = localStorage.getItem(
            "token"
          );
        })
        .catch(onError);
    }
  },
  getAll(resource) {
    return axios
      .get(endpoint + "/" + resource)
      .then((res) => {
        return res.data;
      })
      .catch(onError);
  },
  getOne(resource, id) {
    return axios
      .get(endpoint + "/" + resource + "/" + id)
      .then((res) => res.data)
      .catch(onError);
  },
  getOneFile(resource, id) {
    return axios({
      method: "GET",
      url: endpoint + "/" + resource + "/" + id,
      responseType: "blob",
    })
      .then((res) => res.data)
      .catch(onError);
  },
  post(resource, data) {
    return axios
      .post(endpoint + "/" + resource, data)
      .then((res) => res.data)
      .catch(onError);
  },
  postForm(resource, data) {
    return axios({
      method: "post",
      url: endpoint + "/" + resource,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteOne(resource, id) {
    return axios
      .delete(endpoint + "/" + resource + "/" + id)
      .then((res) => res.data)
      .catch(onError);
  },
  patch(resource, data) {
    return axios
      .patch(endpoint + "/" + resource, data)
      .then((res) => res.data)
      .catch(onError);
  },
  patchOne(resource, id, data) {
    return axios
      .patch(endpoint + "/" + resource + "/" + id, data)
      .then((res) => res.data)
      .catch(onError);
  },
  putOne(resource, id, data) {
    return axios
      .put(endpoint + "/" + resource + "/" + id, data)
      .then((res) => res.data)
      .catch(onError);
  },
};
export default API;

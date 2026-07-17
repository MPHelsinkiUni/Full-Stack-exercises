import axios from "axios";
const baseUrl = "/api/users";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log(newObject);
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const removal = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, create, removal };

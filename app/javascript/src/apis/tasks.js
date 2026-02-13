import axios from "axios";

const fetch = () => axios.get("/tasks");

const create = payload =>
  axios.post("/tasks", {
    task: payload,
  });

const tasksApi = {
  fetch,
  create,
};

export default tasksApi;

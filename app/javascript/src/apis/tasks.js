import axios from "axios";

const fetch = () => axios.get("/tasks");

const tasksApi = { fetch };

export default tasksApi;

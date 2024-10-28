import axios from "axios";
import qs from "qs";
const baseUrl = "http://localhost:8080";

const myToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwidXNlcm5hbWUiOiJxdWFuZ2NodW5nIiwiZW1haWwiOiJQaD9tIFF1YW5nIENodW5nIiwiaWF0IjoxNjcyMDY5MTc4LCJleHAiOjE2NzQ2NjExNzh9.HYzfxqjIITZrKEGJvkEoz_vG6AqCGtuUPnopnTAcbW5V-9jNoiJHpGYnCX_STHOl5zHP4S0d3V71wS3P_JaF3Q"
export async function fetchAPI(
    path,
    { method = "GET", body, token = myToken, params = {} } = {}
) {
    const authen = token ? { Authorization: `Bearer ${token}` } : {};

    const data = body ? body : {};
    const headers = {
        "Content-Type": "application/json",
        ...authen,
    };

    const res = await axios({
        method,
        url: `${baseUrl}${path}`,
        data,
        headers,
        params,
        // paramsSerializer: (params) => {
        //     return qs.stringify(params, { arrayFormat: "repeat" });
        // },
    });
    return res.data;
}

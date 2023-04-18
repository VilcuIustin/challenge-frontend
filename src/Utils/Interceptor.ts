import axios from "axios";

const interceptor: any = axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      return Promise.reject({
        response: {
          message: error.message,
        },
      });
    }
    if (error.response.status == 401) {
      axios.interceptors.response.eject(interceptor);

      return axios
        .post(process.env.REACT_APP_BASE_URL + "auth/refresh", {
          refreshToken: sessionStorage.getItem("refreshToken"),
        })
        .then((response) => {
          sessionStorage.setItem("token", response.data.accessToken);
          sessionStorage.setItem("refreshToken", response.data.refreshToken);
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.accessToken;
          return axios(error.response.config);
        })
        .catch((error) => {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(error);
        })
        .finally(interceptor);
    }

    if (error.response) {
      console.warn(error.response.data.traceId != undefined);
      if (error.response.data.traceId != undefined) {
        return Promise.reject({
          response: {
            message: "Something are wrong!",
            status: error.response.status,
            headers: error.response.headers,
          },
        });
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      if (error.response) console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (config) {
    let token = window.localStorage.getItem("token");
    if (token != null) {
      config.headers!.Authorization = "Bearer " + token;
    } else {
      token = window.sessionStorage.getItem("token");
      if (token != null) {
        config.headers!.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);



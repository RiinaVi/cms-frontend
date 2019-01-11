import {config} from '../config';
import {createUrl} from "./requestTools";

const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
const apiUrlRequest = config.apiUrl;

const fetchTemplate = (urlDomain, method, paramsData) => {
  let url = urlDomain;
  let requestSettings = {
    'method': method,
    'credentials': 'include', //If something not works, comment it.....
    'headers': {
      'Content-type': 'application/json'
    }
  };
  if(paramsData !== undefined){
    if(method === httpMethods.GET)
      url = createUrl(urlDomain, paramsData);
    else if (method === httpMethods.POST || method === httpMethods.PUT)
      requestSettings.body = JSON.stringify(paramsData);
  }
  console.log(requestSettings);
  return fetch(url, requestSettings).then(response => {
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
      const contentType = response.headers.get('Content-Type');
      let result = !!contentType && contentType.includes('application/json') ? response.json() : null;
      return result;
    } else {
      let error = new Error(response.statusText || response.status);
      error.response = response;
      return Promise.reject(error);
    }
  });
}

export const login = (username, password) => {
  const params = {
    username: username,
    password: password
  };
  const url = `${apiUrlRequest}/login`;
  return fetchTemplate(url, httpMethods.POST, params);
}

export const fetchGreeting = () => {
  const params = {
    name: 'Dawid'
  };
  const url = `${apiUrlRequest}/greeting`;
  return fetchTemplate(url, httpMethods.GET, params);
}

export const fetchUserProfile = userId => {
  const url = `${apiUrlRequest}/user/${userId}`;
  return fetchTemplate(url, httpMethods.GET)
}
export const fetchAuthors = () => {
  const url = `${apiUrlRequest}/authors`;
  return fetchTemplate(url, httpMethods.GET)
}
export const fetchReviewers = () => {
  const url = `${apiUrlRequest}/reviewers`;
  return fetchTemplate(url, httpMethods.GET)
}

export const fetchConferences = () => {
  const url = `${apiUrlRequest}/conferences`;
  return fetchTemplate(url, httpMethods.GET)
}

export const fetchSingleConference = conferenceId => {
  const url = `${apiUrlRequest}/conferences/${conferenceId}`;
  return fetchTemplate(url, httpMethods.GET)
}
export const addSingleConference = (conferenceId, conferenceParams) => {
  const url = `${apiUrlRequest}/conferences/${conferenceId}`;
  return fetchTemplate(url, httpMethods.POST, conferenceParams)
}
export const updateSingleConference = (conferenceId, conferenceParams) => {
  const url = `${apiUrlRequest}/conferences/${conferenceId}`;
  return fetchTemplate(url, httpMethods.PUT, conferenceParams)
}
export const deleteSingleConference = conferenceId => {
  const url = `${apiUrlRequest}/conferences/${conferenceId}`;
  return fetchTemplate(url, httpMethods.DELETE)
}

export const fetchArticles = () => {
  const url = `${apiUrlRequest}/articles`;
  return fetchTemplate(url, httpMethods.GET)
}

export const fetchReviews = () => {
  const url = `${apiUrlRequest}/reviews`;
  return fetchTemplate(url, httpMethods.GET)
}


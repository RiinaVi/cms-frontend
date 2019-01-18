import {config} from '../config';
import {createUrl} from "./requestTools";

const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
const apiUrlRequest = config.apiUrl;

const fetchTemplate = (urlDomain, method, paramsData, isFile = false) => {
  let url = urlDomain;
  let formData = null;
  if (isFile) {
    formData = new FormData();
    formData.append("file", paramsData.file);
    formData.append("fileName", paramsData.fileName);
  }
  let requestSettings = !isFile ? {
    'method': method,
    'credentials': 'include', //If something not works, comment it.....
    'headers': {
      'Content-type': 'application/json'
    }
  } : {
    'method': method,
    'credentials': 'include', //If something not works, comment it.....
    
    // 'headers': {
    //   'Content-type': 'multipart/form-data'
    // }
  };
  if(paramsData !== undefined){
    if (method === httpMethods.GET)
      url = createUrl(urlDomain, paramsData);
    else if (method === httpMethods.POST || method === httpMethods.PUT)
      requestSettings.body = isFile ? formData : JSON.stringify(paramsData);
  }
  console.log(requestSettings);
  return fetch(url, requestSettings).then(response => {
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
      const contentType = response.headers.get('Content-Type');
      let result = !!contentType && contentType.includes('application/json') ? response.json() : !!contentType && contentType.includes('application/pdf') ? response.blob() : null;
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

export const logout = () => {
  const url = `${apiUrlRequest}/logout`;
  return fetchTemplate(url, httpMethods.GET);
}

export const fetchGreeting = () => {
  const params = {
    name: 'Dawid'
  };
  const url = `${apiUrlRequest}/greeting`;
  return fetchTemplate(url, httpMethods.GET, params);
}

export const fetchUserConferenceAttendance = conferenceId => {
  const url = `${apiUrlRequest}/conferences/${conferenceId}/attendance/user`;
  return fetchTemplate(url, httpMethods.GET)
}

export const fetchUserLoggedIn = () => {
  const url = `${apiUrlRequest}/user`;
  return fetchTemplate(url, httpMethods.GET)
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

export const fetchArticlesLastVer = () => {
  const url = `${apiUrlRequest}/articlesLatestVersions`;
  return fetchTemplate(url, httpMethods.GET)
}
export const fetchConferenceArticlesLastVer = conferenceId => {
  const url = `${apiUrlRequest}/conferences/${conferenceId}/articlesVersions`;
  return fetchTemplate(url, httpMethods.GET)
}
export const uploadArticle = (file, fileName) => {
  const params = {
    file: file,
    fileName: fileName
  };
  const url = `${apiUrlRequest}/uploadFile`;
  return fetchTemplate(url, httpMethods.POST, params, true)
}
export const downloadArticle = url => {
  return fetchTemplate(url, httpMethods.GET)
}

export const fetchReviews = () => {
  const url = `${apiUrlRequest}/reviews`;
  return fetchTemplate(url, httpMethods.GET)
}


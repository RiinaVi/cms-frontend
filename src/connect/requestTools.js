export const createUrl = (path, params) => {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return path + '?' + queryString;
}

export const saveUser = user => {
  localStorage.setItem('userData', user);
}
export const restoreUser = () => {
  localStorage.getItem('userData');
}

export const getBaseUri = () => {
  return `${window.location.protocol}//${window.location.host}/`;
};

export const uri = (path = '') => {
  return getBaseUri() + path;
};
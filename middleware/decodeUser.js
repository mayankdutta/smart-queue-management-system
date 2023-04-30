const getUserObject = (token) => {
  if (!token) return;
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const str = Buffer.from(base64, 'base64').toString('utf8');
  let jsonPayload = decodeURIComponent(
    str
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
};

module.exports = getUserObject;

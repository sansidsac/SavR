const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'jdggoidnfeifbeijcjf',
  baseURL: 'http://localhost:5173',
  clientID: 'FzaGfDjRwGhlXLXc75AWhtMb3DrQSfq4',
  issuerBaseURL: 'https://dev-n4wg3rh5bvvgj2bw.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

import {
  handleSignupRequest,
  handleLoginRequest,
  handleGetCharts,
  handleUpdatePropertyExpenses,
  handleLogoutRequest,
} from './requestHandlers';

function attachRoutes(app) {
  app.post('/signup', handleSignupRequest);
  app.post('/login', handleLoginRequest);
  app.post('/logout', handleLogoutRequest);
  app.get('/charts', handleGetCharts);
  app.post('/property-expenses', handleUpdatePropertyExpenses);
}

export default attachRoutes;
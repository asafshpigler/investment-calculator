import {
  handleSignupRequest,
  handleLoginRequest,
  handleGetCharts,
  handleGetPropertyExpenses,
  handleUpdatePropertyExpenses
} from './requestHandlers';

function attachRoutes(app) {
  app.post('/signup', handleSignupRequest);
  app.get('/login', handleLoginRequest);
  
  app.get('/charts', handleGetCharts);

  app.get('/property-expenses', handleGetPropertyExpenses);
  app.post('/property-expenses', handleUpdatePropertyExpenses);
}

export default attachRoutes;
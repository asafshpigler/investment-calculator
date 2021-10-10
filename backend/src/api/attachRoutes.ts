import {handleSignupRequest, handleLoginRequest, handleGetCharts} from './requestHandlers';

function attachRoutes(app) {
  app.post('/signup', handleSignupRequest);
  app.get('/login', handleLoginRequest);
  app.get('/charts', handleGetCharts)
}

export default attachRoutes;

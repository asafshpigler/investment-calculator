import {handleSignupRequest, handleLoginRequest} from './requestHandlers';

function attachRoutes(app) {
  app.post('/signup', handleSignupRequest);
  app.get('/login', handleLoginRequest)
}

export default attachRoutes;

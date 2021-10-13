import { getUser, insertUser } from "../../db/user";
import { UserDBO } from "../../db/models/User";

export async function handleSignupRequest(req, res, next) {
  const { userName } = req.body;

  try {
    const user: UserDBO = await signUp(userName);
    req.session.user = user;
    
    res.json(user);
  } catch (error) {
    next(error);
  }
}

// TODO: this should respond in user, and charts, and avg numbers, and expenses

// TODO NOW: for now, just respond with the user itself, (which is saved on session, not just user id)
//    in case it already exists, before querying to SQL
export async function handleLoginRequest(req, res, next) {
  const {userName} = req.body;
  const {user: sessionUser} = req.session;

  // this handler is used for the cases right now, might be split later. handle and throw errors to make sense in your mind. might be removed later
  // INPUT VALIDATION
  if (userName && sessionUser) {
    throw new Error('redundant user information, we already have a session')
  }
  if (!userName && !sessionUser) {
    console.log('initial login attempt, using site cookie. though there is no session user, so it failed');
    res.end()
    // throw new Error('have not sent user name. it is crucial to enable authentication, that has not happened yet based on lack of req.session.user inii')
  }

  try {
    console.log('attempting login', {userName, session: req.session});
    let user: UserDBO = null;

    // when user name is sent, and we don't have a session user yet, we'll attempt login
    if (userName) {
      const userFromDB = await login(userName);

      // after successful login, save user info in the session, it'll be used for other queries to DB
      user = userFromDB;
      req.session.user = userFromDB;
    }
    
    // otherwise, session user should exist, simply return it
    else {
      user = sessionUser;
    }
    
    res.json(user);
  } catch (error) {
    next(error)
  }
}

export function handleLogoutRequest(req, res, next) {
  req.session.destroy(function (err) {
    res.end();
  });
}

// REMOVE ON POLISH: actual logic

async function signUp(userName: string): Promise<UserDBO> {
  const isUserExists: boolean = !!await getUser(userName);

  if (isUserExists) {
    throw new Error('User already exists');
  }

  const newUser: UserDBO = await insertUser(userName);
  return newUser;
}

async function login(userName: string): Promise<UserDBO> {
  const user: UserDBO = await getUser(userName);
  
  if (!user) {
    throw new Error('User doesn\'t exist')
  }

  return user;
}
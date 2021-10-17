import { UserDBO } from "../../db/models/User";
import * as db from "../../db";

export async function handleSignupRequest(req, res, next) {
  console.log('handleSignupRequest');

  try {
    validateSignupInput(req);

    const user: UserDBO = await signUp(req.body.userName);
    req.session.user = user;
    
    res.json(user);
  } catch (error) {
    next(error);
  }
}

function validateSignupInput(req) {
  if (!req.body.userName) {
    throw new Error('invalid signup input');
  }
}

export async function handleLoginRequest(req, res, next) {
  console.log('handleLoginRequest');
  
  try {
    if (!req.body.userName && !req.session.user) {
      console.log('no existing session to resume');
      res.end();
      return;
    }
    
    const {userName} = req.body;
    const {user: sessionUser} = req.session;

    let user: UserDBO = null;

    // user login
    if (userName) {
      const userFromDB = await login(userName);

      user = userFromDB;
      req.session.user = userFromDB;
    }

    // application login
    else {
      user = sessionUser;
    }
    
    res.json(user);
  } catch (error) {
    next(error)
  }
}

export function handleLogoutRequest(req, res, next) {
  console.log('handleLogoutRequest');
  
  req.session.destroy(function () {
    res.end();
  });
}

async function signUp(userName: string): Promise<UserDBO> {
  const isUserExists: boolean = !!await db.getUser(userName);

  if (isUserExists) {
    throw new Error('User already exists');
  }

  const newUser: UserDBO = await db.insertUser(userName);
  
  return newUser;
}

async function login(userName: string): Promise<UserDBO> {
  const user: UserDBO = await db.getUser(userName);
  
  if (!user) {
    throw new Error('User doesn\'t exist')
  }

  return user;
}
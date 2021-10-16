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

// TODO: this should respond in user, and charts, and avg numbers, and expenses

// TODO NOW: for now, just respond with the user itself, (which is saved on session, not just user id)
//    in case it already exists, before querying to SQL
export async function handleLoginRequest(req, res, next) {
  console.log('handleLoginRequest');
  
  try {
    validateLoginInput(req);
    
    const {userName} = req.body;
    const {user: sessionUser} = req.session;

    let user: UserDBO = null;

    // user login
    if (userName) {
      const userFromDB = await login(userName);

      user = userFromDB;
      req.session.user = userFromDB;
    }

    // application login, resume usage of website
    else {
      user = sessionUser;
    }
    
    res.json(user);
  } catch (error) {
    next(error)
  }
}

function validateLoginInput(req) {
  if (!req.body.userName && !req.session.user) {
    throw new Error('invalid login input');
  }
}

export function handleLogoutRequest(req, res, next) {
  console.log('handleLogoutRequest');
  
  req.session.destroy(function () {
    res.end();
  });
}

// REMOVE ON POLISH: actual logic

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
import { getUser, insertUser } from "../../db/user";
import { UserDBO } from "../../models/User";

export async function handleSignupRequest(req, res, next) {
  const { userName } = req.body;

  try {
    const user: UserDBO = await signUp(userName);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function handleLoginRequest(req, res, next) {
  const { userName } = req.body;

  try {
    const user: UserDBO = await login(userName);
    res.json(user);
  } catch (error) {
    next(error);
  }
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
  const user = await getUser(userName);

  if (!user) {
    throw new Error('User doesn\'t exist')
  }

  return user;
}
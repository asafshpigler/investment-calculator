import { getUser, insertUser } from "../db/user";
import { UserDTO } from "../models/User.table";

// Wrapper functions

export async function handleSignupRequest(req, res, next) {
  const { userName } = req.body;
  
  try {
    const user: UserDTO = await signUp(userName);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function handleLoginRequest(req, res, next) {
  const { userName } = req.body;
  
  try {
    const user: UserDTO = await login(userName);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

// Actual server logic

export async function signUp(userName: string): Promise<UserDTO> {
  const isUserExists: boolean = !!await getUser(userName);

  if (isUserExists) {
    throw new Error('User already exists');
  }

  const newUser: UserDTO = await insertUser(userName);
  return newUser;
}

export async function login(userName: string): Promise<UserDTO> {
  const user = await getUser(userName);

  if (!user) {
    throw new Error('User doesn\'t exist')
  }

  return user;
}
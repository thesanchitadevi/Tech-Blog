// User registration interface
export interface IUserRegister {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

// User login interface
export interface IUserLogin {
  email: string;
  password: string;
}

export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  user: {
    name: string;
    email: string;
    password: string;
  };
}

interface ICreateUserTokenDTO {
  userId: string;
  expiresAt: Date;
  refreshToken: string;
}

export { ICreateUserTokenDTO };

interface jwtPayload {
  id: string;
  userRole: string;
  iat: number;
  exp: number;
}

export type payload = jwtPayload;

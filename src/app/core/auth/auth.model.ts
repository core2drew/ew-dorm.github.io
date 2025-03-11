export type AuthUser = Partial<
  Readonly<{
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    idToken: string;
  }>
>;

export type AuthProps = {
  user?: AuthUser;
  loggedIn: boolean;
};

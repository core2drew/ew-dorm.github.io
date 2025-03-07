export type AuthUser = Partial<
  Readonly<{
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }>
>;

export type AuthProps = {
  user?: AuthUser;
  loggedIn: boolean;
};

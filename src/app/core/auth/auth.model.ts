import { ROLES } from '../../enums/roles';

export type AuthUser = Partial<
  Readonly<{
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    role: ROLES;
    idToken: string;
  }>
>;

export type AuthProps = {
  user?: AuthUser;
  loggedIn: boolean;
};

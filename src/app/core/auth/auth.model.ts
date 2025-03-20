import { ROLES } from '../../enums/roles';
import { State } from '../../shared/models/state.model';

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

export type AuthProps = State & {
  user?: AuthUser;
  loggedIn: boolean;
};

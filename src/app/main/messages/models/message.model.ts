import { User } from '../../../shared/models/user.model';

type UserContact = {
  uid: User['id'];
  mobileNo: User['mobileNo'];
};

export type SendMessage = {
  message: string;
  userContacts: UserContact[];
};

export type Message = {
  timestamp: string;
  recipientsName: string[];
  message: string;
};

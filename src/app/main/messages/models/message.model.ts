import { Timestamp } from 'firebase/firestore';

import { State } from '../../../shared/models/state.model';
import { User } from '../../../shared/models/user.model';

type UserContact = {
  uid: User['id'];
  mobileNo: User['mobileNo'];
};

export type SendMessage = {
  message: string;
  userContacts: UserContact[];
};

export type MessageDocument = {
  id: string;
  timestamp: Timestamp;
  uids: string[];
  message: string;
};

export type Message = State & {
  id: string;
  recipientsName: string[];
  message: string;
  timestamp: string;
};

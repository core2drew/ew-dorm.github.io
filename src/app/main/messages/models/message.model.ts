import { Timestamp } from 'firebase/firestore';

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
  timestamp: Timestamp;
  uids: string[];
  message: string;
};

export interface Message extends Omit<MessageDocument, 'uids' | 'timestamp'> {
  recipientsName: string[];
  timestamp: string;
}

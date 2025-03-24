import { User } from '../../../shared/models/user.model';

export type Message = {
  subject: string;
  message: string;
  timestamp: string;
  recipients: User['name'][];
};

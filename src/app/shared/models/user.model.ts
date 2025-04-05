import { Timestamp } from 'firebase/firestore';

export type User = {
  id: string;
  isActive?: boolean;
  isApproved?: boolean;
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  name?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserDocument = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

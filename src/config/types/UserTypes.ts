import { ProfileSchema } from '../zod-schemas/profileSchema';
import { Response } from './Auth/AuthResponse';
import { PaginationParams } from './common/PaginationTypes';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  totalSpent: number;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  error: string | null;
}

export interface UserActions {
  usersValues: User[];
  users: User[];
  selectedUser: User | null;
  error: string | null;
  total: number;
  loading: boolean;
  fetchAllUsersFiltered: (params: PaginationParams) => Promise<void>;
  fetchAllUsersValues: () => Promise<void>;
  fetchUserById: (userId: number) => Promise<void>;
  updateUser: (userId: number, updateData: ProfileSchema) => Promise<Response>;
  makeInactive: (userId: number) => Promise<Response>;
}

export type UserStore = UserState & UserActions;

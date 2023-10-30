import { Role } from '../eum/user-role.enum';

export interface ISerializedUsers {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  id: string;
  created_at: string;
  updated_at: string;
}

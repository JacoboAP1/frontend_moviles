export const ROLES = ['ROLE_WORKER', 'ROLE_CLIENT', 'ROLE_ADMIN'] as const;
export type Role = (typeof ROLES)[number];

export interface User {
  name: string;
  email: string;
  roles: Role[];
}

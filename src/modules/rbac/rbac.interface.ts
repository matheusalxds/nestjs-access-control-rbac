export type CanIn = {
  role: string | string[] | RbacRoles[];
  operation: string;
  params?: object;
};

export type CanOut = boolean;

export interface IRbacService {
  can: ({ operation, role }: CanIn) => Promise<CanOut>;
}

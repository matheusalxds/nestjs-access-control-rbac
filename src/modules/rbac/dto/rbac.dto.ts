type RoleObject = {
  name: string;
  when: (params: object) => Promise<boolean>;
};

type RbacRoles = {
  [key: string]: {
    can: Array<string | RoleObject>;
    inherits?: string[] | undefined;
  };
};

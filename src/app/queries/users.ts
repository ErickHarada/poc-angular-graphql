export const allUsers = `
{
  users {
    _id
    email
    name
    active
  }
}
`;

export function getUserByEmail(email: string) {
  return `
  {
    getUserByEmail(email: "${email}") {
      _id
      name
      email
      active
    }
  }`;
}

export function createUser(name: string, email: string) {
  return `
  mutation {
    createUser(name: "${name}", email: "${email}") {
      _id
      name
      email
      active
    }
  }`;
}
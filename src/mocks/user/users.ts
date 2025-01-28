import { faker } from "@faker-js/faker";

export const users: API.User = Array.from({ length: 1000 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    avatar: faker.image.avatar(),
    nickname: faker.person.bio(),
    username: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: "international" }),
    status: faker.helpers.arrayElement(["active", "inactive", "invited", "suspended"]),
    role: faker.helpers.arrayElement(["superadmin", "admin", "cashier", "manager"]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});

import { faker } from "@faker-js/faker";

export const users = Array.from({ length: 1000 }, (): API.User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    nickname: faker.person.firstName().toLocaleLowerCase(),
    username: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: "international" }),
    status: faker.helpers.arrayElement(["active", "inactive", "invited", "suspended"]),
    permissions: faker.helpers.arrayElements(["read", "write", "delete"], 3),
    role: faker.helpers.arrayElement(["superadmin", "admin", "cashier", "manager"]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    remark: faker.lorem.sentence(),
  };
});

import { faker } from "@faker-js/faker";

export const users = Array.from({ length: 1000 }, (): API.System.User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    nickname: faker.person.firstName().toLocaleLowerCase(),
    username: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phone: faker.phone.number({ style: "international" }),
    // status: faker.helpers.arrayElement([1, 2]),
    status: faker.helpers.arrayElement([1, 2]),
    // permissions: faker.helpers.arrayElements(["read", "write", "delete"], 3),
    // role: faker.helpers.arrayElement(["superadmin", "admin", "cashier", "manager"]),
    create_time: faker.date.past().toISOString(),
    update_time: faker.date.recent().toISOString(),
    remark: faker.lorem.sentence(),
  };
});

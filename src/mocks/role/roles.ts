import { faker } from "@faker-js/faker";

export const roles = Array.from({ length: 1000 }, (): API.System.Role => {
  return {
    id: faker.string.uuid(),
    create_time: faker.date.past().toString(),
    update_time: faker.date.recent().toString(),
    keyword: faker.string.alphanumeric(8),
    name: faker.person.fullName(),
    description: faker.string.sample(60),
    type: faker.number.int({ min: 1, max: 3 }),
    sequence: faker.number.int({ min: 1, max: 100 }),
    status: faker.helpers.arrayElement([1, 2]),
    is_system: faker.helpers.arrayElement([true, false]),
  };
});

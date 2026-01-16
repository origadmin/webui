import { faker } from "@faker-js/faker";

export const resources = Array.from({ length: 1000 }, (): API.System.Resource => {
  return {
    id: faker.string.uuid(),
    status: faker.helpers.arrayElement([1, 2]),
    name: faker.person.lastName(),
    keyword: faker.string.sample(10),
    parent_id: faker.string.uuid(),
    i18n: faker.string.sample(10),
    type: faker.helpers.arrayElement(["menu", "button"]),
    operation: faker.string.sample(10),
    method: faker.string.sample(10),
    sequence: faker.number.int({ min: 1, max: 100 }),
    tree_path: faker.string.sample(10),
    description: faker.lorem.sentence(),
    create_time: faker.date.past().toISOString(),
    update_time: faker.date.recent().toISOString(),
  };
});

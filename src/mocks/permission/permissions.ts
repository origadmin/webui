import { faker } from "@faker-js/faker";


// Create a function to generate a single permission record
const createRandomPermission = (): API.System.Permission => ({
  id: faker.string.uuid(),
  keyword: faker.lorem.slug(),
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  status: faker.helpers.arrayElement([1, 2]),
  create_time: faker.date.past().toISOString(),
  update_time: faker.date.recent().toISOString(),
});

// Generate a list of permissions
export const permissions: API.System.Permission[] = Array.from({ length: 50 }, createRandomPermission);

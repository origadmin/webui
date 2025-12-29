import { faker } from "@faker-js/faker";

// Create a function to generate a single permission record
const createRandomPermission = (): API.System.Permission => ({
  id: faker.string.uuid(),
  parent_id: faker.datatype.boolean() ? faker.string.uuid() : "0", // Simulate top-level and nested permissions
  type: faker.helpers.arrayElement(["MENU", "BUTTON", "API"]),
  keyword: faker.lorem.slug(),
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  path: faker.internet.url(),
  component: faker.system.filePath(),
  icon: faker.helpers.arrayElement(["user", "role", "permission", "view"]),
  sequence: faker.number.int({ min: 1, max: 100 }),
  status: faker.helpers.arrayElement([1, 2]),
  is_system: faker.datatype.boolean(),
  create_time: faker.date.past().toISOString(),
  update_time: faker.date.recent().toISOString(),
});

// Generate a list of permissions
export const permissions: API.System.Permission[] = Array.from({ length: 50 }, createRandomPermission);

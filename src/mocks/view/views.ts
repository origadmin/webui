import { faker } from "@faker-js/faker";
import { API } from "@/types/api";

const generateViews = (): API.System.View[] => {
  const views: API.System.View[] = [];
  const numViews = 50;

  for (let i = 0; i < numViews; i++) {
    const viewName = faker.lorem.words({ min: 2, max: 3 });
    const isMenu = i < 5 || (i > 5 && faker.datatype.boolean({ probability: 0.5 })); // First 5 are menus, others have a chance

    const view: API.System.View = {
      // Proto 定义 id 为 int64，Mock 应该生成数字 (或数字字符串，视生成的类型而定)
      id: faker.number.int({ min: 1, max: 100000 }), 
      create_time: faker.date.past().toISOString(),
      update_time: faker.date.recent().toISOString(),
      keyword: faker.helpers.slugify(viewName).toLowerCase(),
      name: viewName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      scope: faker.helpers.arrayElement(["system", "dashboard", "general"]),
      type: isMenu ? "MENU" : "BUTTON",
      path: isMenu ? `/${faker.lorem.word()}/${faker.lorem.word()}` : undefined,
      icon: isMenu ? faker.helpers.arrayElement(["IconHome", "IconUser", "IconSettings", "IconTool", "IconDatabase", "IconBox"]) : undefined,
      visible: true,
      status: faker.helpers.arrayElement([0, 1]),
      sequence: i + 1,
      description: faker.lorem.sentence(),
      // 初始化字段，避免类型缺失报错
      parent_id: undefined,
      children: [],
    };

    // Assign parent_id to create a tree structure
    // The first 5 items are root nodes.
    if (i >= 5 && views.length > 0) {
      // Assign a random parent from the views created so far.
      const parentView = faker.helpers.arrayElement(views);
      view.parent_id = parentView.id;
      // A button should not have a path or icon
      if (view.type === 'BUTTON') {
        view.path = undefined;
        view.icon = undefined;
      }
    }
    
    views.push(view);
  }

  return views;
};

export const views: API.System.View[] = generateViews();

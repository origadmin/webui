import { useState } from "react";
import { useRBAC } from "@/context/v1";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SystemSettings() {
  const {
    permissions,
    menus,
    routes,
    addPermission,
    // updatePermission,
    deletePermission,
    addMenu,
    // updateMenu,
    deleteMenu,
    addRoute,
    // updateRoute,
    deleteRoute,
  } = useRBAC();

  const [newPermission, setNewPermission] = useState({ name: "", description: "" });
  const [newMenu, setNewMenu] = useState({ name: "", path: "", icon: "", parentId: null });
  const [newRoute, setNewRoute] = useState({ path: "", component: "", permissions: [] });

  const handleAddPermission = () => {
    if (newPermission.name) {
      addPermission({ id: Date.now().toString(), ...newPermission });
      setNewPermission({ name: "", description: "" });
    }
  };

  const handleAddMenu = () => {
    if (newMenu.name && newMenu.path) {
      addMenu({ id: Date.now().toString(), ...newMenu });
      setNewMenu({ name: "", path: "", icon: "", parentId: null });
    }
  };

  const handleAddRoute = () => {
    if (newRoute.path && newRoute.component) {
      addRoute({ id: Date.now().toString(), ...newRoute });
      setNewRoute({ path: "", component: "", permissions: [] });
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Settings</h1>
      <Tabs defaultValue='permissions'>
        <TabsList>
          <TabsTrigger value='permissions'>Permissions</TabsTrigger>
          <TabsTrigger value='menus'>Menus</TabsTrigger>
          <TabsTrigger value='routes'>Routes</TabsTrigger>
        </TabsList>

        <TabsContent value='permissions'>
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Manage system permissions</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex space-x-2'>
                <div className='flex-1'>
                  <Label htmlFor='permissionName'>Name</Label>
                  <Input
                    id='permissionName'
                    value={newPermission.name}
                    onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                    placeholder='Enter permission name'
                  />
                </div>
                <div className='flex-1'>
                  <Label htmlFor='permissionDescription'>Description</Label>
                  <Input
                    id='permissionDescription'
                    value={newPermission.description}
                    onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                    placeholder='Enter permission description'
                  />
                </div>
                <Button onClick={handleAddPermission} className='mt-6'>
                  Add Permission
                </Button>
              </div>
              <div className='space-y-2'>
                {permissions.map((permission) => (
                  <Card key={permission.id}>
                    <CardHeader>
                      <CardTitle>{permission.name}</CardTitle>
                      <CardDescription>{permission.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant='destructive' onClick={() => deletePermission(permission.id)}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='menus'>
          <Card>
            <CardHeader>
              <CardTitle>Menus</CardTitle>
              <CardDescription>Manage system menus</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex space-x-2'>
                <div className='flex-1'>
                  <Label htmlFor='menuName'>Name</Label>
                  <Input
                    id='menuName'
                    value={newMenu.name}
                    onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                    placeholder='Enter menu name'
                  />
                </div>
                <div className='flex-1'>
                  <Label htmlFor='menuPath'>Path</Label>
                  <Input
                    id='menuPath'
                    value={newMenu.path}
                    onChange={(e) => setNewMenu({ ...newMenu, path: e.target.value })}
                    placeholder='Enter menu path'
                  />
                </div>
                <div className='flex-1'>
                  <Label htmlFor='menuIcon'>Icon</Label>
                  <Input
                    id='menuIcon'
                    value={newMenu.icon}
                    onChange={(e) => setNewMenu({ ...newMenu, icon: e.target.value })}
                    placeholder='Enter menu icon'
                  />
                </div>
                <div className='flex-1'>
                  <Label htmlFor='menuParent'>Parent Menu</Label>
                  <Select onValueChange={(value) => setNewMenu({ ...newMenu, parentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select parent menu' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='none'>None</SelectItem> {/* Updated line */}
                      {menus.map((menu) => (
                        <SelectItem key={menu.id} value={menu.id}>
                          {menu.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddMenu} className='mt-6'>
                  Add Menu
                </Button>
              </div>
              <div className='space-y-2'>
                {menus.map((menu) => (
                  <Card key={menu.id}>
                    <CardHeader>
                      <CardTitle>{menu.name}</CardTitle>
                      <CardDescription>{menu.path}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Icon: {menu.icon}</p>
                      <p>Parent: {menu.parentId ? menus.find((m) => m.id === menu.parentId)?.name : "None"}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant='destructive' onClick={() => deleteMenu(menu.id)}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='routes'>
          <Card>
            <CardHeader>
              <CardTitle>Routes</CardTitle>
              <CardDescription>Manage system routes</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex space-x-2'>
                <div className='flex-1'>
                  <Label htmlFor='routePath'>Path</Label>
                  <Input
                    id='routePath'
                    value={newRoute.path}
                    onChange={(e) => setNewRoute({ ...newRoute, path: e.target.value })}
                    placeholder='Enter route path'
                  />
                </div>
                <div className='flex-1'>
                  <Label htmlFor='routeComponent'>Component</Label>
                  <Input
                    id='routeComponent'
                    value={newRoute.component}
                    onChange={(e) => setNewRoute({ ...newRoute, component: e.target.value })}
                    placeholder='Enter route component'
                  />
                </div>
                <div className='flex-1'>
                  <Label htmlFor='routePermissions'>Permissions</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewRoute({ ...newRoute, permissions: [...newRoute.permissions, value] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select permissions' />
                    </SelectTrigger>
                    <SelectContent>
                      {permissions.map((permission) => (
                        <SelectItem key={permission.id} value={permission.id}>
                          {permission.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddRoute} className='mt-6'>
                  Add Route
                </Button>
              </div>
              <div className='space-y-2'>
                {routes.map((route) => (
                  <Card key={route.id}>
                    <CardHeader>
                      <CardTitle>{route.path}</CardTitle>
                      <CardDescription>{route.component}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Permissions:{" "}
                        {route.permissions.map((p) => permissions.find((perm) => perm.id === p)?.name).join(", ")}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant='destructive' onClick={() => deleteRoute(route.id)}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SystemSettings;

import React from "react";
import { useRBAC } from "@/context/v2";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { menus, logout } = useRBAC();

  const renderMenuItems = (parentId: string | null = null): React.ReactNode => {
    return menus
      .filter((menu) => menu.parentId === parentId)
      .map((menu) => (
        <div key={menu.id}>
          <Link to={menu.path}>
            <Button variant='ghost' className='w-full justify-start mb-2'>
              {menu.name}
            </Button>
          </Link>
          {renderMenuItems(menu.id)}
        </div>
      ));
  };

  return (
    <div className='w-64 bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-4'>RBAC System</h1>
      <nav className='mb-4'>{renderMenuItems()}</nav>
      <Button onClick={logout} variant='outline' className='w-full'>
        Logout
      </Button>
    </div>
  );
}

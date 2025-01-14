import { Content } from '@/components/content';
import ThemeSwitch from '@/components/Theme/theme-switch';
import { Search } from '@/components/search';
import { UserNav } from '@/components/user-nav';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { tasks } from './data/tasks';

export default function Tasks() {
  return (
    <Content>
      {/* ===== Top Heading ===== */}
      <Content.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Content.Header>

      <Content.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>Here&apos;s a list of your tasks for this month!</p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Content.Body>
    </Content>
  );
}

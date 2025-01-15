export interface ListItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  owner: string;
  progress: number;
}

export const listItems: ListItem[] = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'A cutting-edge software development project',
    status: 'active',
    createdAt: '2023-01-15',
    owner: 'John Doe',
    progress: 75,
  },
  {
    id: '2',
    title: 'Marketing Campaign',
    description: 'Q2 digital marketing initiative',
    status: 'active',
    createdAt: '2023-02-01',
    owner: 'Jane Smith',
    progress: 40,
  },
  {
    id: '3',
    title: 'Infrastructure Upgrade',
    description: 'Server and network improvements',
    status: 'inactive',
    createdAt: '2023-03-10',
    owner: 'Mike Johnson',
    progress: 90,
  },
  // Add more items as needed
];


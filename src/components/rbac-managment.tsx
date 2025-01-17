import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RBACManagementProps {
  initialResources: API.Resource[];
}

export function RBACManagement({ initialResources }: RBACManagementProps) {
  const [resources, setResources] = useState<API.Resource[]>(initialResources);
  const [selectedResource, setSelectedResource] = useState<API.Resource | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddResource = (newResource: API.Resource) => {
    setResources([...resources, { ...newResource, id: Date.now() }]);
    setIsDialogOpen(false);
  };

  const handleUpdateResource = (updatedResource: API.Resource) => {
    setResources(resources.map((r) => (r.id === updatedResource.id ? updatedResource : r)));
    setIsDialogOpen(false);
  };

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter((r) => r.id !== id));
  };

  const renderResourceTree = (parentId: number | null = null, level: number = 0): React.ReactNode => {
    return resources
      .filter((resource) => resource.parent_id === parentId)
      .map((resource) => (
        <React.Fragment key={resource.id}>
          <TableRow>
            <TableCell style={{ paddingLeft: `${level * 20}px` }}>{resource.name}</TableCell>
            <TableCell>{resource.type}</TableCell>
            <TableCell>{resource.uri}</TableCell>
            <TableCell>{resource.method}</TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  setSelectedResource(resource);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button variant='destructive' onClick={() => handleDeleteResource(resource.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
          {renderResourceTree(resource.id, level + 1)}
        </React.Fragment>
      ));
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>RBAC Management</h1>
      <Button
        onClick={() => {
          setSelectedResource(null);
          setIsDialogOpen(true);
        }}
      >
        Add Resource
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>URI</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderResourceTree()}</TableBody>
      </Table>
      <ResourceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={selectedResource ? handleUpdateResource : handleAddResource}
        resource={selectedResource}
        resources={resources}
      />
    </div>
  );
}

interface ResourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: API.Resource) => void;
  resource: API.Resource | null;
  resources: API.Resource[];
}

function ResourceDialog({ isOpen, onClose, onSave, resource, resources }: ResourceDialogProps) {
  const [formData, setFormData] = useState<Partial<API.Resource>>(resource || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as API.Resource);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{resource ? "Edit Resource" : "Add Resource"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' name='name' value={formData.name || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor='type'>Type</Label>
            <Select
              name='type'
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as "M" | "A" | "B" | "P" })}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='M'>Menu</SelectItem>
                <SelectItem value='A'>API</SelectItem>
                <SelectItem value='B'>Button</SelectItem>
                <SelectItem value='P'>Page</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='uri'>URI</Label>
            <Input id='uri' name='uri' value={formData.uri || ""} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor='method'>Method</Label>
            <Input id='method' name='method' value={formData.method || ""} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor='parent_id'>Parent</Label>
            <Select
              name='parent_id'
              value={formData.parent_id?.toString()}
              onValueChange={(value) => setFormData({ ...formData, parent_id: value ? parseInt(value) : null })}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select parent' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='0'>None</SelectItem>
                {resources.map((r) => (
                  <SelectItem key={r.id} value={r.id.toString()}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type='submit'>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

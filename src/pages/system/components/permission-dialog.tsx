"use client";

import type React from "react";
import { useState } from "react";
import { usePermissionsQuery, usePermissionCreate, usePermissionDelete } from "@/api/system/permission";
import { useResourcesQuery } from "@/api/system/resource";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Plus, Edit, Trash2, Shield } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface PermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PermissionDialog({ open, onOpenChange }: PermissionDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPermission, setCurrentPermission] = useState<API.System.Permission>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  // React Query hooks
  const { data: permissions = {}, isLoading: isLoadingPermissions } = usePermissionsQuery();
  const { data: resources = {}, isLoading: isLoadingResources } = useResourcesQuery();
  const queryClient = useQueryClient();
  const { mutate: savePermission, isPending: isSaving } = usePermissionCreate(queryClient);
  const { mutate: deletePermission, isPending: isDeleting } = usePermissionDelete(queryClient);

  // Filter permissions based on search query
  const filteredPermissions =
    permissions?.data?.filter(
      (permission) =>
        permission.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.keyword?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
  };

  // Get type badge color
  const getTypeBadgeColor = (type?: string) => {
    switch (type) {
      case "self":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "role":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "dept":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Handle adding a new permission
  const handleAddPermission = () => {
    setCurrentPermission({ data_scope: "self" });
    setSelectedResources([]);
    setIsEditMode(false);
    setIsFormDialogOpen(true);
  };

  // Handle editing a permission
  const handleEditPermission = (permission: API.System.Permission) => {
    setCurrentPermission({ ...permission });
    setSelectedResources(permission.resources?.map((r) => r.id || "").filter((v) => v !== "") || []);
    setIsEditMode(true);
    // setIsDialogOpen(true);
  };

  // Handle deleting a permission
  const handleDeletePermission = (id?: string) => {
    if (!id) return;
    deletePermission(id);
  };

  // Handle saving a permission (add or edit)
  const handleSavePermission = (e: React.FormEvent) => {
    e.preventDefault();

    // Add selected resources to the permission
    const selectedResourceObjects = resources?.data?.filter((r) => r.id && selectedResources.includes(r.id));

    const permissionToSave: API.System.Permission = {
      ...currentPermission,
      resources: selectedResourceObjects,
    };

    savePermission(permissionToSave);
    // setIsDialogOpen(false);
  };

  // Handle input changes for the permission form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentPermission({ ...currentPermission, [name]: value });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setCurrentPermission({ ...currentPermission, [name]: value });
  };

  // Handle data rules changes
  const handleDataRuleChange = (key: string, value: string) => {
    setCurrentPermission({
      ...currentPermission,
      data_rules: { ...(currentPermission.data_rules || {}), [key]: value },
    });
  };

  // Handle resource selection
  const handleResourceSelection = (resourceId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedResources([...selectedResources, resourceId]);
    } else {
      setSelectedResources(selectedResources.filter((id) => id !== resourceId));
    }
  };

  if (isLoadingPermissions || isLoadingResources) {
    return <div className='flex justify-center items-center h-64'>Loading...</div>;
  }

  console.log("permissions", permissions);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {open || (
          <Button variant='outline'>
            <Shield className='mr-2 h-4 w-4' /> Manage Permissions
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-w-5xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Permission Management</DialogTitle>
          <DialogDescription>View, add, edit, and delete system permissions</DialogDescription>
        </DialogHeader>

        <div className='flex justify-between items-center my-4'>
          <div className='relative w-72'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search permissions...'
              className='pl-8'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAddPermission}>
            <Plus className='mr-2 h-4 w-4' /> Add Permission
          </Button>
        </div>

        <div className='border rounded-md'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Resources</TableHead>
                <TableHead>Data Scope</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className='text-center py-4'>
                    No permissions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className='font-medium'>{permission.name || "-"}</TableCell>
                    <TableCell>{permission.keyword || "-"}</TableCell>
                    <TableCell className='max-w-xs truncate'>{permission.description || "-"}</TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1'>
                        {permission.resources && permission.resources.length > 0 ? (
                          permission.resources.slice(0, 2).map((resource) => (
                            <Badge key={resource.id} variant='secondary' className='text-xs'>
                              {resource.name}
                            </Badge>
                          ))
                        ) : (
                          <span className='text-muted-foreground'>None</span>
                        )}
                        {permission.resources && permission.resources.length > 2 && (
                          <Badge variant='secondary' className='text-xs'>
                            +{permission.resources.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {permission.data_scope && (
                        <Badge variant='outline' className={getTypeBadgeColor(permission.data_scope)}>
                          {permission.data_scope}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(permission.update_time)}</TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button variant='ghost' size='icon' onClick={() => handleEditPermission(permission)}>
                          <Edit className='h-4 w-4' />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant='ghost' size='icon'>
                              <Trash2 className='h-4 w-4 text-destructive' />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Permission</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the permission "{permission.name}"? This action cannot
                                be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePermission(permission.id)}
                                disabled={isDeleting}
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Add/Edit Permission Dialog */}
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent className='sm:max-w-[650px]'>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Permission" : "Add Permission"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update the permission details below." : "Fill in the permission details below."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSavePermission}>
              <Tabs defaultValue='basic' className='w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='basic'>Basic Info</TabsTrigger>
                  <TabsTrigger value='resources'>Resources</TabsTrigger>
                  <TabsTrigger value='rules'>Data Rules</TabsTrigger>
                </TabsList>

                <TabsContent value='basic' className='space-y-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-right'>
                      Name
                    </Label>
                    <Input
                      id='name'
                      name='name'
                      value={currentPermission.name || ""}
                      onChange={handleInputChange}
                      className='col-span-3'
                      required
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='keyword' className='text-right'>
                      Keyword
                    </Label>
                    <Input
                      id='keyword'
                      name='keyword'
                      value={currentPermission.keyword || ""}
                      onChange={handleInputChange}
                      className='col-span-3'
                      required
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='data_scope' className='text-right'>
                      Data Scope
                    </Label>
                    <Select
                      value={currentPermission.data_scope || "self"}
                      onValueChange={(value) => handleSelectChange("data_scope", value)}
                    >
                      <SelectTrigger id='data_scope' className='col-span-3'>
                        <SelectValue placeholder='Select data_scope' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='self'>Self</SelectItem>
                        <SelectItem value='role'>Role</SelectItem>
                        <SelectItem value='dept'>Department</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='description' className='text-right'>
                      Description
                    </Label>
                    <Textarea
                      id='description'
                      name='description'
                      value={currentPermission.description || ""}
                      onChange={handleInputChange}
                      className='col-span-3'
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value='resources' className='py-4'>
                  <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                      <h3 className='text-sm font-medium'>Available Resources</h3>
                      <Badge variant='outline'>{selectedResources.length} selected</Badge>
                    </div>
                    <div className='border rounded-md p-4 h-[300px] overflow-y-auto'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        {resources?.data?.map((resource) => (
                          <div key={resource.id} className='flex items-start space-x-2'>
                            <Checkbox
                              id={`resource-${resource.id}`}
                              checked={!!resource.id && selectedResources.includes(resource.id)}
                              onCheckedChange={(checked) =>
                                handleResourceSelection(resource.id || "", checked === true)
                              }
                            />
                            <div className='grid gap-1.5'>
                              <Label
                                htmlFor={`resource-${resource.id}`}
                                className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                              >
                                {resource.name}
                              </Label>
                              {resource.description && (
                                <p className='text-sm text-muted-foreground'>{resource.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='rules' className='py-4'>
                  <div className='space-y-4'>
                    <h3 className='text-sm font-medium'>Data Rules</h3>
                    <div className='space-y-2'>
                      {Object.entries(currentPermission.data_rules || {}).map(([key, value], index) => (
                        <div key={index} className='flex gap-2'>
                          <Input
                            value={key}
                            onChange={(e) => {
                              const newRules = { ...currentPermission.data_rules } as { [key: string]: string };
                              const oldValue = newRules[key];
                              delete newRules[key];
                              newRules[e.target.value] = oldValue;
                              setCurrentPermission({ ...currentPermission, data_rules: newRules });
                            }}
                            placeholder='Key'
                            className='flex-1'
                          />
                          <Input
                            value={value}
                            onChange={(e) => handleDataRuleChange(key, e.target.value)}
                            placeholder='Value'
                            className='flex-1'
                          />
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => {
                              const newRules = { ...currentPermission.data_rules } as { [key: string]: string };
                              delete newRules[key];
                              setCurrentPermission({ ...currentPermission, data_rules: newRules });
                            }}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          const newRules = { ...currentPermission.data_rules } as { [key: string]: string };
                          newRules[`key${Object.keys(newRules).length + 1}`] = "";
                          setCurrentPermission({ ...currentPermission, data_rules: newRules });
                        }}
                      >
                        <Plus className='h-4 w-4 mr-2' /> Add Rule
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className='mt-6 flex justify-end gap-2'>
                <Button type='button' variant='outline' onClick={() => setIsFormDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type='submit' disabled={isSaving}>
                  {isSaving ? "Saving..." : isEditMode ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}

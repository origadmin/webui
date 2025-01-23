import React, { useEffect, useState } from "react";
import { addUser, getUser, updateUser } from "@/services/system/user";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RoleSelect } from "./RoleSelect";

type UserModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  open: boolean;
  title: string;
  id?: string;
};

export const UserModal: React.FC<UserModalProps> = (props) => {
  const [userData, setUserData] = useState<API.User>({});

  useEffect(() => {
    if (!props.open) {
      return;
    }

    setUserData({});
    if (props.id) {
      getUser(props.id).then((res) => {
        if (res.data) {
          setUserData({
            ...res.data.data,
            status_checked: res.data.data?.status === "activated",
          });
        }
      });
    }
  }, [props.open, props.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: API.User = {
      username: formData.get("username") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      remark: formData.get("remark") as string,
      status: formData.get("status_checked") === "on" ? "activated" : "freezed",
      roles: userData.roles,
      avatar: formData.get("avatar") as string,
      password: formData.get("password") as string,
    };

    if (props.id) {
      await updateUser(props.id, values);
    } else {
      await addUser(values);
    }

    props.onSuccess();
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input id='username' name='username' defaultValue={userData.username} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input id='name' name='name' defaultValue={userData.name} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-right'>
                Email
              </Label>
              <Input id='email' name='email' defaultValue={userData.email} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='phone' className='text-right'>
                Phone
              </Label>
              <Input id='phone' name='phone' defaultValue={userData.phone} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='avatar' className='text-right'>
                Avatar
              </Label>
              <Input id='avatar' name='avatar' defaultValue={userData.avatar} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='password' className='text-right'>
                Password
              </Label>
              <Input id='password' name='password' type='password' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='roles' className='text-right'>
                Roles
              </Label>
              <RoleSelect
                value={userData.roles}
                onChange={(roles) => setUserData({ ...userData, roles })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='remark' className='text-right'>
                Remark
              </Label>
              <Textarea id='remark' name='remark' defaultValue={userData.remark} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='status' className='text-right'>
                Status
              </Label>
              <Switch
                id='status_checked'
                name='status_checked'
                checked={userData.status_checked}
                onCheckedChange={(checked) => setUserData({ ...userData, status_checked: checked })}
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

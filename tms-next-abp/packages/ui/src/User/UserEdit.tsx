import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import {
    IdentityRoleDto,
    IdentityUserUpdateDto,
    UserService
} from '@tms_next_abp/proxy';
import { useToast } from '../Shared/hooks/useToast';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '../Shared/DialogWrapper';
import { Button } from '../Shared/Button';
import { Input } from '../Shared/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Shared/Tabs';
import { useAssignableRoles, useUserRoles } from '@tms_next_abp/hooks';
import Loader from '../Shared/Loader';
import classNames from 'classnames';
import { Checkbox } from '../Shared/Checkbox';

const TABS_NAME = {
    USERS_EDIT: 'user_edit',
    USERS_ROLE_ASSIGN: 'user_role_assign'
};

type RoleType = {
    name: string;
    id: string;
};

type UserEditProps = {
    userDto: IdentityUserUpdateDto;
    userId: string;
    onDismiss: () => void;
};
export const UserEdit = ({ userDto, userId, onDismiss }: UserEditProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();
    const [roles, setRoles] = useState<RoleType[]>([]);
    const userRole = useUserRoles({ userId });
    const assignableRoles = useAssignableRoles();

    const onSubmit = async (data: unknown) => {
        const user = data as IdentityUserUpdateDto;
        try {
            await UserService.userUpdate(userId, { ...userDto, ...user });
            toast({
                title: 'Success',
                description: 'User Updated Successfully',
                variant: 'default'
            });
            onCloseEvent();
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "User update wasn't successfull.",
                    variant: 'destructive'
                });
            }
        }
    };

    const onCloseEvent = () => {
        setOpen(false);
        onDismiss();
    };

    useEffect(() => {
        setOpen(true);
    }, []);

    useEffect(() => {
        if (userRole.data?.items) {
            const temp: RoleType[] = [];
            userRole.data.items.forEach((r) => {
                temp.push({ name: r.name!, id: r.id! });
            });
            setRoles(temp);
        }
    }, [userRole.data?.items]);

    const onRoleAssignEvent = useCallback(
        (role: IdentityRoleDto) => {
            const hasAssignedRoleExistAlready = roles.findIndex(
                (r) => role.id === r.id
            );
            if (hasAssignedRoleExistAlready !== -1) {
                roles.splice(hasAssignedRoleExistAlready, 1);
                setRoles([...roles]);
            } else {
                roles.push({ name: role.name!, id: role.id! });
                setRoles([...roles]);
            }
        },
        [roles]
    );

    const onRoleAssignedSaveEvent = async (e: MouseEvent) => {
        e.preventDefault();
        const updateUserDto: IdentityUserUpdateDto = {
            ...userDto,
            roleNames: roles?.map((r) => r.name) ?? []
        };
        await onSubmit(updateUserDto);
    };
    return (
        <Dialog open={open} onOpenChange={onCloseEvent}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upate a User: {userDto.userName}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue={TABS_NAME.USERS_EDIT}>
                    <TabsList className="w-full">
                        <TabsTrigger
                            value={TABS_NAME.USERS_EDIT}
                            className="w-full"
                        >
                            User Information
                        </TabsTrigger>
                        <TabsTrigger
                            value={TABS_NAME.USERS_ROLE_ASSIGN}
                            className="w-full"
                        >
                            Roles
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={TABS_NAME.USERS_EDIT}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <section className="flex flex-col space-y-5">
                                <Input
                                    required
                                    label="Name"
                                    defaultValue={userDto.name ?? ''}
                                    {...register('name')}
                                />

                                <Input
                                    required
                                    label="Surname"
                                    defaultValue={userDto.surname ?? ''}
                                    {...register('surname')}
                                />
                                <Input
                                    required
                                    label="Email"
                                    defaultValue={userDto.email ?? ''}
                                    {...register('email')}
                                />
                                <Input
                                    required
                                    label="Phone Number"
                                    defaultValue={userDto.phoneNumber ?? ''}
                                    {...register('phoneNumber')}
                                />
                            </section>

                            <DialogFooter className="mt-5">
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onCloseEvent();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="subtle">
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    </TabsContent>
                    <TabsContent value={TABS_NAME.USERS_ROLE_ASSIGN}>
                        {assignableRoles?.isLoading && <Loader />}
                        {assignableRoles?.isError && (
                            <div className="p-10 bg-error  text-3xl">
                                There was an error while featching roles
                                information for the {userDto.userName}
                            </div>
                        )}
                        {!assignableRoles.isLoading &&
                            !assignableRoles.isError && (
                                <>
                                    {assignableRoles.data.items?.map((r) => (
                                        <div
                                            key={v4()}
                                            className={classNames(
                                                'flex items-center space-x-2 pb-5'
                                            )}
                                        >
                                            <Checkbox
                                                id={r.id}
                                                name={r.name!}
                                                variant="subtle"
                                                checked={
                                                    !!roles?.find(
                                                        (l) => l.id === r.id
                                                    )
                                                }
                                                onCheckedChange={() => {
                                                    onRoleAssignEvent(r);
                                                }}
                                            />
                                            <label
                                                htmlFor={r.id}
                                                className="text-sm  font-medium leading-none"
                                            >
                                                {r.name}
                                            </label>
                                        </div>
                                    ))}
                                </>
                            )}
                        <DialogFooter className="mt-5">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onCloseEvent();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onRoleAssignedSaveEvent}
                                variant="subtle"
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

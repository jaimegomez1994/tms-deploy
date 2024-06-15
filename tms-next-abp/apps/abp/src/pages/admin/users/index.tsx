import { NextPage } from 'next';
import React from 'react';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    AdminLayout,
    UserList,
    RoleList,
    AddUser
} from '@tms_next_abp/ui';
import { useI18n } from 'next-localization';
import { AdminMenus } from '../../../utils/Constants';
import Link from 'next/link';

const UsersPage: NextPage = () => {
    const i18n = useI18n();
    const users = i18n.t('AbpIdentity.Users');
    const roles = i18n.t('AbpIdentity.Roles');

    return (
        <AdminLayout menus={AdminMenus}>
            <div className="w-full">
                <Tabs value={users}>
                    <TabsList className="w-full">
                        <TabsTrigger value={users} className="w-full" asChild>
                            <Link href={'/admin/users'}>{users}</Link>
                        </TabsTrigger>
                        <TabsTrigger value={roles} className="w-full" asChild>
                            <Link href={'/admin/users/roles'}>{roles}</Link>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={users}>
                        <AddUser />
                        <UserList />
                    </TabsContent>
                    <TabsContent value={roles}>
                        <RoleList />
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
};

export default UsersPage;

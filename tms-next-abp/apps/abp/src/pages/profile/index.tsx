import { NextPage } from 'next';
import React from 'react';
import {
    AdminLayout,
    ProfileSettings,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@tms_next_abp/ui';
import { AdminMenus } from '../../utils/Constants';
import Link from 'next/link';

const ProfilePage: NextPage = () => {
    const ps = 'Personal Settings';
    const cp = 'Change Password';

    return (
        <AdminLayout menus={AdminMenus}>
            <Tabs defaultValue={ps} className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value={ps} className="w-full" asChild>
                        <Link href={'/profile'}> {ps}</Link>
                    </TabsTrigger>
                    <TabsTrigger value={cp} className="w-full" asChild>
                        <Link href={'/profile/change_password'}> {cp}</Link>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value={ps}>
                    <section>
                        <h3 className="title font-bold text-xl grow p-0 m-1 truncate">
                            Personal Settings
                        </h3>
                        <hr className="mt-3 mb-3" />
                        <ProfileSettings />
                    </section>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default ProfilePage;

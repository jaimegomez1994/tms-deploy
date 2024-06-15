import type { NextPage } from 'next';
import { AdminLayout, Card } from '@tms_next_abp/ui';
import {
    FaRocket,
    FaCubes,
    FaChevronRight,
    FaPlus,
    FaTwitter,
    FaGithub
} from 'react-icons/fa';
import { AdminMenus } from '../utils/Constants';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const AdminPage: NextPage = () => {
    const session = useSession();
    return (
        <AdminLayout menus={AdminMenus}>
            <section className="home"></section>
        </AdminLayout>
    );
};

export default AdminPage;

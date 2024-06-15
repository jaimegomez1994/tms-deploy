'use client';
import { Menus } from '../../utils/Constants';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Content } from './Content';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
    const [mounted, setMounted] = useState(false);
    let isAdminPage =
        typeof window !== 'undefined' &&
        ['roles', 'admin', 'profiles'].some((condition) =>
            window?.location?.pathname.includes(condition)
        );

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        mounted && (
            <>
                {!isAdminPage && (
                    <>
                        <Header menus={Menus} />
                        <NavBar menus={Menus} />
                    </>
                )}
                <Content
                    isAdminPage={isAdminPage}
                    children={children}
                ></Content>
            </>
        )
    );
}

import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { UserMenus } from '@tms_next_abp/ui';
import { Cross, Menu } from 'lucide-react';
import { HomeIcon } from '@heroicons/react/24/outline';

export interface NavBarProps {
    menus: {
        Name: string;
        Link: string;
    }[];
    showNavBar: boolean;
}

export const NavBar = ({ menus }: NavBarProps, showNavBar) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <nav className="invisible sm:visible fixed flex flex-col h-full justify-between shadow-lg z-10 bg-gray-900 py-8 w-24">
            <div className="flex items-center text-xl font-bold text-white justify-center flex-col">
                <Link href="/" className="truncate">
                    TMS
                </Link>
                <ul className="items-center hidden md:flex pt-20 text-base">
                    {menus.map((menu, index) => {
                        return (
                            <li
                                key={index}
                                className="growing-underline mx-3 p-4 rounded"
                            >
                                <a href={menu.Link} className="truncate">
                                    <HomeIcon className="h-15 w-15 text-blue-500" />
                                    {menu.Name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="hidden md:flex md:flex-col">
                <div className="flex items-center justify-center mr-6"></div>
                <UserMenus />
            </div>
        </nav>
    );
};

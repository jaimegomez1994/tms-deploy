import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { UserMenus } from '../User/UserMenus';
import { Cross, Menu } from 'lucide-react';
import { HomeIcon } from '@heroicons/react/24/outline';

export interface NavBarProps {
    menus: {
        Name: string;
        Link: string;
    }[];
}

export const NavBar = ({ menus }: NavBarProps) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <nav className="fixed flex flex-col h-full justify-between shadow-lg z-10 bg-gray-900 py-8 w-24">
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
            <div
                id="showMenu"
                className="md:hidden flex items-center justify-center"
            >
                <Menu
                    width={32}
                    height={32}
                    className="text-primary flex-1"
                    onClick={() => setIsVisible(true)}
                />
            </div>
            <div
                id="mobileNav"
                className={classNames(
                    'px-4 py-6 fixed top-0 left-0 h-full w-full z-20 animate-fade-in-down bg-base-100 ',
                    { hidden: !isVisible }
                )}
            >
                <div
                    id="hideMenu"
                    className="flex justify-end"
                    onClick={() => setIsVisible(false)}
                >
                    <Cross width={24} height={24} className="text-primary" />
                </div>
                <ul className="flex flex-col mx-8 my-24 items-center text-3xl">
                    {menus.map((menu, index) => {
                        return (
                            <li key={index} className="my-6">
                                <a href={menu.Link}>{menu.Name}</a>
                            </li>
                        );
                    })}
                </ul>
                <section className="flex flex-col">
                    <UserMenus />
                </section>
            </div>
        </nav>
    );
};

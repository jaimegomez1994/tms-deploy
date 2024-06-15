import Link from 'next/link';
import classNames from 'classnames';
import { useState } from 'react';
import { Submenu } from './Submenu';
import { Cross, Menu } from 'lucide-react';

import { UserMenus } from '@tms_next_abp/ui';
import { Bars3Icon } from '@heroicons/react/24/outline';

export interface HeaderProps {
    menus: {
        Name: string;
        Link: string;
    }[];
}

export const Header = ({ menus }: HeaderProps) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="z-10 fixed w-full sm:left-24 h-16 bg-white flex flex-row items-center border-b-2">
            <div className="flex visible sm:hidden">
                <div onClick={() => setIsVisible(true)}>
                    <Bars3Icon className="h-7 w-7 font-semibold text-sm text-neutral-500"></Bars3Icon>
                </div>
                <div className="text-xl font-bold pl-3">
                    <Link href="/" className="truncate">
                        TMS
                    </Link>
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
                        <Cross
                            width={24}
                            height={24}
                            className="text-primary"
                        />
                    </div>
                    <ul className="flex flex-col mx-8 my-24 items-center text-3xl">
                        {menus.map((menu, index) => {
                            return (
                                <li key={index} className="my-6">
                                    <a href={menu.Link}>{menu.Name}</a>
                                </li>
                            );
                        })}
                        <li>
                            <Submenu
                                onClickMobile={() => setIsVisible(false)}
                            />
                        </li>
                    </ul>
                    <section className="flex flex-col">
                        <UserMenus />
                    </section>
                </div>
            </div>
            <div className="flex invisible sm:visible">
                <Link
                    className="pl-10 font-semibold text-sm text-neutral-500"
                    href="/"
                >
                    Home
                </Link>
                <Submenu />
            </div>
        </div>
    );
};

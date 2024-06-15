import Link from 'next/link';

export interface HeaderProps {
    menus: {
        Name: string;
        Link: string;
    }[];
}

export const Header = ({ menus }: HeaderProps) => {
    return (
        <div className="fixed w-full left-24 h-16 bg-white flex flex-row items-center border-b-2"></div>
    );
};

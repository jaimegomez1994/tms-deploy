import React from 'react';
import { UserDropDown } from './UserDropDown';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import { Button } from '../Shared/Button';
export interface UserMenusProps {}

export const UserMenus = ({}: UserMenusProps) => {
    var session = useSession();
    const renderElement = () => {
        if (session.data) {
            return <UserDropDown />;
        }

        return (
            <div className="flex flex-col items-center space-x-1">
                <Button
                    variant="subtle"
                    size="sm"
                    className="w-full mt-2 sm:w-1/2 sm:mt-0 px-7"
                    onClick={() => {
                        signIn('openiddict', undefined, {
                            __tenant: getCookie('__tenant') as string
                            // prompt: "login",
                        });
                    }}
                >
                    Login
                </Button>
            </div>
        );
    };
    return (
        <div className="flex flex-col justify-center items-center ">
            {renderElement()}
        </div>
    );
};

import React from 'react';
export interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return <section className="z-0 main-layout">{children}</section>;
};

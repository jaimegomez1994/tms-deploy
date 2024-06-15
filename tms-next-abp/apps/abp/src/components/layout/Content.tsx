import { ReactElement } from 'react';

export interface ContentProps {
    children: ReactElement;
    isAdminPage: boolean;
}

export const Content = (props: ContentProps) => {
    const { children, isAdminPage } = props;
    let classNameString = isAdminPage
        ? ''
        : 'fixed pt-8 w-[95vw] sm:left-24 top-16 bg-slate-100 md:mt-0 h-screen lg:px-8 md:px-12 px-4';

    return <main className={classNameString}>{children}</main>;
};

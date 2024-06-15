import { NavBar } from '../Admin/NavBar';
import { Header } from '../Admin/Header';
import { Hero } from '../Sections/Hero';

export interface LandingLayoutProps {
    menus: {
        Name: string;
        Link: string;
    }[];
}

export const LandingLayout = ({ menus }: LandingLayoutProps) => {
    return (
        <section className="landing-layout">
            <NavBar menus={menus} />
            <Header menus={menus} />
            <Hero />
        </section>
    );
};

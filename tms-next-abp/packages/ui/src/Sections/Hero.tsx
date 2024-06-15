import Image from 'next/legacy/image';
import { Button } from '../Shared/Button';
import { ClientService } from '@tms_next_abp/proxy';

export interface HeroProps {
    // children: any;
}

export const Hero = (props: HeroProps) => {
    async function getClientData() {
        const data = await ClientService.clientGetList();
    }
    return (
        <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 ">
            <button onClick={getClientData}>Get data</button>
        </section>
    );
};

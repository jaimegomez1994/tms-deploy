import { useState, useEffect } from 'react';
import { CountryService } from '@tms_next_abp/proxy';

export default function useCountry() {
    const [countries, setCountries] = useState([]);

    function getCountries() {
        CountryService.countryGetList().then((data) =>
            setCountries(data?.items)
        );
    }

    useEffect(() => {
        getCountries();
    }, []);

    return { countries };
}

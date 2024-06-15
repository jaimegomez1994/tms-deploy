import { useState, useEffect } from 'react';
import { StateService } from '@tms_next_abp/proxy';

export default function useStates() {
    const [states, setStates] = useState([]);

    function getStates() {
        StateService.statesGetList().then((data) => setStates(data?.items));
    }

    useEffect(() => {
        getStates();
    }, []);

    return { states };
}

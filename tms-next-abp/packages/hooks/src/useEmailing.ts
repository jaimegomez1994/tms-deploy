import { EmailSettingsService, EmailSettingsDto } from '@tms_next_abp/proxy';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

export const useEmailing = (): UseQueryResult<EmailSettingsDto, unknown> => {
    return useQuery(
        [QueryNames.GetEmailing],
        async () => {
            const data = await EmailSettingsService.emailSettingsGet();
            return data;
        },
        {
            keepPreviousData: false,
            cacheTime: undefined,
            refetchOnWindowFocus: false
        }
    );
};

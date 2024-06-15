import { UseQueryResult, useQuery } from '@tanstack/react-query';
import {
    AbpApplicationConfigurationService,
    ApplicationConfigurationDto
} from '@tms_next_abp/proxy';
import { QueryNames } from './QueryConstants';

export const useAppConfig = (): UseQueryResult<
    ApplicationConfigurationDto,
    unknown
> => {
    return useQuery(
        [QueryNames.GetAppConfig],
        async () => {
            const data =
                await AbpApplicationConfigurationService.abpApplicationConfigurationGet();
            return data;
        },
        {
            keepPreviousData: false,
            cacheTime: undefined,
            refetchOnWindowFocus: false
        }
    );
};

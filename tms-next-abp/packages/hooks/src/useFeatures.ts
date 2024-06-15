import { FeaturesService, GetFeatureListResultDto } from '@tms_next_abp/proxy';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

export const useFeatures = (
    providerName: string | undefined,
    providerKey: string | undefined
): UseQueryResult<GetFeatureListResultDto, unknown> => {
    return useQuery(
        [QueryNames.GetFeatures, providerName],
        async () => {
            const data = await FeaturesService.featuresGet(
                providerName,
                providerKey
            );
            return data;
        },
        {
            keepPreviousData: false,
            cacheTime: undefined,
            refetchOnWindowFocus: false
        }
    );
};

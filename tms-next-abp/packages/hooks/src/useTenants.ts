import { useQuery } from '@tanstack/react-query';
import { TenantService } from '@tms_next_abp/proxy';
import { QueryNames } from './QueryConstants';

export const useTenants = (
    pageIndex: number,
    pageSize: number,
    filter?: string | undefined,
    sorting?: string | undefined
) => {
    return useQuery(
        [QueryNames.GetTenants, pageIndex, pageSize, filter, sorting],
        async () => {
            let skip = 0;
            if (pageIndex > 0) {
                skip = pageIndex * pageSize;
            }
            const data = await TenantService.tenantGetList(
                filter ? filter : undefined,
                sorting ? sorting : undefined,
                skip,
                pageSize
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

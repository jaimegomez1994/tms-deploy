import { useQuery } from '@tanstack/react-query';
import { RoleService } from '@tms_next_abp/proxy';
import { QueryNames } from './QueryConstants';

export const useRoles = (
    pageIndex: number,
    pageSize: number,
    filter?: string | undefined,
    sorting?: string | undefined
) => {
    return useQuery(
        [QueryNames.GetRoles, pageIndex, pageSize, filter, sorting],
        async () => {
            let skip = 0;
            if (pageIndex > 0) {
                skip = pageIndex * pageSize;
            }
            const data = await RoleService.roleGetList(
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

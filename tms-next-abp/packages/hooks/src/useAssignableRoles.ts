import { useQuery } from '@tanstack/react-query';
import { UserService } from '@tms_next_abp/proxy';
import { QueryNames } from './QueryConstants';

export const useAssignableRoles = () => {
    return useQuery(
        [QueryNames.GetAssignableRoles],
        async () => {
            const data = await UserService.userGetAssignableRoles();
            return data;
        },
        {
            keepPreviousData: false,
            cacheTime: undefined,
            refetchOnWindowFocus: false
        }
    );
};

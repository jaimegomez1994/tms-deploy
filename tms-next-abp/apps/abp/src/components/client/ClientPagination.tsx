import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ClientPagination(props) {
    const { totalItems, onNextPage, onPreviousPage, firstIndex, lastIndex } =
        props;

    const currentPageLabel = `${firstIndex} -${lastIndex}`;

    return (
        <span className="w-10/12   py-6 flex items-center justify-end">
            <div>{`${currentPageLabel} de ${totalItems}`}</div>
            <span className="flex pl-3">
                <ChevronLeftIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={onPreviousPage}
                />
                <ChevronRightIcon
                    className="h-5 w-5 ml-4 cursor-pointer"
                    onClick={onNextPage}
                />
            </span>
        </span>
    );
}

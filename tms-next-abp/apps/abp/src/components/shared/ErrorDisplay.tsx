import { XCircleIcon } from '@heroicons/react/24/solid';

export default function ErrorDisplay(props) {
    const { message } = props;
    return (
        <div className="my-4 sm:pl-[18px] py-2 border-y-2  border-y-red-500 flex">
            <XCircleIcon className="h-5 w-5 text-red-500"></XCircleIcon>
            <span className="pl-2">{`Error: ${message}`}</span>
        </div>
    );
}

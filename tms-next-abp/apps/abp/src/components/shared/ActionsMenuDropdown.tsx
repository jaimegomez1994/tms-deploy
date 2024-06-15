import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function ActionsMenuDropdown(props) {
    const { onEdit, onDelete, hideEdit = false, id } = props;
    const dropdownRef = useRef(null);
    const buttonDropdownRef = useRef(null);
    const [dropdownStates, setDropdownStates] = useState({});

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !dropdownRef?.current?.contains(event.target) &&
                !buttonDropdownRef?.current?.contains(event.target)
            ) {
                setDropdownStates({});
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <button
            ref={buttonDropdownRef}
            className="flex justify-content items-center bg-zinc-300 p-2 rounded relative"
            onClick={() => {
                setDropdownStates(() => ({
                    [id]: true
                }));
            }}
        >
            <span>Actions</span>
            <span className="pl-2">
                <ChevronDownIcon className="h-3 w-3 text-blue-500" />
            </span>
            {dropdownStates[id] && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full bg-white py-2 left-4 border border-gray-300 z-10 "
                >
                    {!hideEdit && (
                        <div
                            className="py-1 text-sm text-neutral-500 border-b-2 px-8"
                            onClick={onEdit}
                        >
                            Edit
                        </div>
                    )}
                    <div
                        className="py-1 text-sm text-neutral-500 px-8"
                        onClick={onDelete}
                    >
                        Delete
                    </div>
                </div>
            )}
        </button>
    );
}

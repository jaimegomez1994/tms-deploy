import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function CompanyActionsMenuDropdown(props) {
    const {
        onEdit,
        onDelete,
        menuRef,
        id,
        onDivisionCreation,
        onAccountCreation
    } = props;
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
            className="flex justify-content items-center bg-zinc-300 p-2 rounded"
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
                    className="absolute top-full bg-white py-2 left-5 border border-gray-300 z-10 "
                >
                    <div
                        className="py-2 text-sm text-neutral-500 border-b-2 px-8"
                        onClick={onEdit}
                    >
                        Edit
                    </div>
                    <div
                        className="py-2 text-sm text-neutral-500 border-b-2 px-8"
                        onClick={onDelete}
                    >
                        Delete
                    </div>
                    <div
                        className="py-2 text-sm text-neutral-500 border-b-2  px-1"
                        onClick={onAccountCreation}
                    >
                        Agregar Cuenta
                    </div>
                    <div
                        className="py-2 text-sm text-neutral-500 px-1"
                        onClick={onDivisionCreation}
                    >
                        Agregar Division
                    </div>
                </div>
            )}
        </button>
    );
}

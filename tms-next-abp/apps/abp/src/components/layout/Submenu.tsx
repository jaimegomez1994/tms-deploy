import Link from 'next/link';
import { ArchiveBoxIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const Submenu = (props) => {
    const { onClickMobile } = props;
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isPermitHoldersSubMenuOpen, setIsPermitHoldersSubMenuOpen] =
        useState(false);

    return (
        <>
            <button
                className="flex pl-10 justify-content items-center"
                onMouseOver={() => {
                    setIsSubMenuOpen(true);
                }}
                onMouseOut={() => {
                    setIsSubMenuOpen(false);
                }}
            >
                <ArchiveBoxIcon className="h-5 w-5 text-blue-500" />
                <div className="pl-2 font-semibold text-sm text-neutral-500">
                    Catalagos
                </div>
                <span className="pl-2">
                    <ChevronDownIcon className="h-3 w-3 text-blue-500" />
                </span>
                {isSubMenuOpen && (
                    <div
                        onClick={() => onClickMobile?.()}
                        className="fixed top-10 flex flex-col bg-white border-2 border-t-0 pl-5 pr-10 text-start"
                    >
                        <Link
                            className="py-2 pt-6 font-semibold text-sm text-neutral-500"
                            href="/divisiones"
                        >
                            Divisiones
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/clients"
                        >
                            Clientes
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/country"
                        >
                            Paises
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/states"
                        >
                            Estados
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/products"
                        >
                            Productos
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/companies"
                        >
                            Empresas
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/routes"
                        >
                            Rutas
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/trailer-type"
                        >
                            Tipo de Remolque
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/articulated-unit-type"
                        >
                            Tipo de Unidad Articulada
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/contracts"
                        >
                            Contratos
                        </Link>
                    </div>
                )}
            </button>
            <button
                className="flex pl-10 justify-content items-center"
                onMouseOver={() => {
                    setIsPermitHoldersSubMenuOpen(true);
                }}
                onMouseOut={() => {
                    setIsPermitHoldersSubMenuOpen(false);
                }}
            >
                <ArchiveBoxIcon className="h-5 w-5 text-blue-500" />
                <div className="pl-2 font-semibold text-sm text-neutral-500">
                    Permisionarios
                </div>
                <span className="pl-2">
                    <ChevronDownIcon className="h-3 w-3 text-blue-500" />
                </span>
                {isPermitHoldersSubMenuOpen && (
                    <div
                        onClick={() => onClickMobile?.()}
                        className="fixed top-10 flex flex-col bg-white border-2 border-t-0 pl-5 pr-10 text-start"
                    >
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/operators"
                        >
                            Operadores
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/accessory-unit"
                        >
                            Unidad Accesorio
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/tractor-trucks"
                        >
                            Tractocamiones
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/trailer"
                        >
                            Remolques
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/articulated-unit"
                        >
                            Unidad Articulada
                        </Link>
                        <Link
                            className="py-2 font-semibold text-sm text-neutral-500"
                            href="/license-holder"
                        >
                            Permisionario
                        </Link>
                        
                    </div>
                )}
            </button>
        </>
    );
};

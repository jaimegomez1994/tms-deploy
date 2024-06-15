import { useEffect, useRef, useState } from 'react';

export default function Filter(props) {
    const { listOfItems, handleFilter, FilterOptionComponent } = props;

    const [filterValue, setFilterValue] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showFilterLabel, setShowFilterLabel] = useState(false);
    const containerRef = useRef(null);
    const buttonContainerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !containerRef?.current?.contains(event.target) &&
                !buttonContainerRef?.current?.contains(event.target)
            ) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-9/12 flex justify-between py-6">
            <div>
                {showFilterLabel && filterValue && (
                    <>
                        <span>{`Filtrado por: ${filterValue}`}</span>
                        <button
                            className="pl-12 underline"
                            onClick={() => {
                                setFilterValue('');
                                handleFilter('');
                                setShowFilterLabel(false);
                            }}
                        >
                            Reset Filter
                        </button>
                    </>
                )}
            </div>
            <div className="relative">
                <button
                    ref={buttonContainerRef}
                    onClick={() => setIsFilterOpen(true)}
                    className="bg-sky-500 text-white py-3 px-6 rounded"
                >
                    Filtrar
                </button>
                {isFilterOpen && (
                    <div
                        ref={containerRef}
                        className="absolute top-14 right-8 bg-white p-7 z-10"
                    >
                        <div className="border-b-2 p-3">Opciones de filtro</div>
                        <FilterOptionComponent
                            listOfItems={listOfItems}
                            filterValue={filterValue}
                            setFilterValue={setFilterValue}
                        />

                        <div className="flex p-3 justify-between">
                            <button
                                className="bg-neutral-200 text-gray-600 py-3 px-3 rounded"
                                disabled={!filterValue}
                                onClick={() => {
                                    setShowFilterLabel(true);
                                    setIsFilterOpen(false);
                                    setFilterValue('');
                                    handleFilter('');
                                }}
                            >
                                Reiniciar
                            </button>
                            <button
                                onClick={() => {
                                    setShowFilterLabel(true);
                                    setIsFilterOpen(false);
                                    handleFilter(filterValue);
                                }}
                                className="bg-sky-500 text-white py-3 px-5 rounded"
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

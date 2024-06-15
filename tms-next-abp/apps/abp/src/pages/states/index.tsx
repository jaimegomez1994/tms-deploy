'use client';
import { useEffect, useState } from 'react';
import { CountryService, StateService } from '@tms_next_abp/proxy';
import StateModal from '../../components/state/StateModal';
import ActionsMenuDropdown from '../../components/shared/ActionsMenuDropdown';
import StateUpdateModal from '../../components/state/StateUpdateModal';
import Filter from '../../components/shared/Filter';
import CountryFilterOption from '../../components/state/CountryFilterOption';

export default function States() {
    const [states, setStates] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [countries, setCountries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [filterCountry, setFilterCountry] = useState('');
    const [currentState, setCurrentState] = useState({});

    let filteredStates = filterCountry
        ? states.filter((state) => state.pais === filterCountry)
        : states;

    async function getStateData() {
        const data = await StateService.statesGetList();
        setStates(data?.items);
    }

    async function getCountryData() {
        const data = await CountryService.countryGetList();
        setCountries(data?.items);
    }

    useEffect(() => {
        setMounted(true);
        getStateData();
        getCountryData();
    }, []);

    function addState(stateName, selectedCountry) {
        StateService.addState({
            nombre: stateName,
            pais: selectedCountry
        })
            .then(() => {
                setIsModalOpen(false);
                getStateData();
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    function updateState(currentState) {
        const { nombre, pais, id } = currentState;
        StateService.updateState(id, pais, nombre)
            .then(() => {
                setIsUpdateModalOpen(false);
                getStateData();
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }
    function deleteState(id) {
        try {
            StateService.deleteState(id);
            getStateData();
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        mounted && (
            <>
                <Filter
                    listOfItems={countries}
                    handleFilter={(country: string) =>
                        setFilterCountry(country)
                    }
                    FilterOptionComponent={CountryFilterOption}
                />
                <div className="overflow-auto max-h-[60%] mb-8">
                    <table className="mb-24">
                        <tbody className="text-sm font-normal text-neutral-500">
                            <thead>
                                <tr className="border-b-2 text-left">
                                    <th className="px-24">Estado</th>
                                    <th className="px-24">Pais</th>
                                    <th className="px-8">Actions</th>
                                </tr>
                            </thead>
                            <div className="">
                                {filteredStates?.map((state) => {
                                    return (
                                        <tr>
                                            <td className="px-16 py-2 font-normal text-left">
                                                {state.nombre}
                                            </td>
                                            <td className="px-16 py-2 font-normal text-left">
                                                {state.pais}
                                            </td>
                                            <td className="px-8 py-2 font-normal text-left relative">
                                                <ActionsMenuDropdown
                                                    id={state.id}
                                                    onEdit={() => {
                                                        setCurrentState({
                                                            id: state.id,
                                                            nombre: state.nombre,
                                                            pais: state.pais
                                                        });
                                                        setIsUpdateModalOpen(
                                                            true
                                                        );
                                                    }}
                                                    onDelete={() =>
                                                        deleteState(state.id)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </div>
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sky-500 text-white p-3 rounded"
                >
                    Agregar Estado
                </button>
                <StateModal
                    isModalOpen={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    addState={addState}
                    error={error}
                    setError={setError}
                    countries={countries}
                ></StateModal>
                <StateUpdateModal
                    isModalOpen={isUpdateModalOpen}
                    onCloseModal={() => setIsUpdateModalOpen(false)}
                    currentState={currentState}
                    setCurrentState={(currentState) =>
                        setCurrentState((prev) => ({
                            ...prev,
                            ...currentState
                        }))
                    }
                    updateState={() => updateState(currentState)}
                    countries={countries}
                    error={error}
                ></StateUpdateModal>
            </>
        )
    );
}

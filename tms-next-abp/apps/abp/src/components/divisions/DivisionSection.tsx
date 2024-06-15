import { useEffect, useState } from 'react';
import DivisionTable from './DivisionTable';

import { DivisionService } from '@tms_next_abp/proxy';
import DivisionModal from './DivisionModal';

type DivisionType = {
    alias: string;
    nombre: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
    pais: string;
};

export default function DivisionSection(props) {
    const { companyID, countries, states } = props;

    const [divisions, setDivisions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [division, setDivision] = useState<DivisionType>();

    function getDivisions(companyID) {
        setLoading(true);
        DivisionService.divisionGetList(companyID)
            .then((data) => {
                setDivisions(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const buildBody = (division) => {
        return {
            alias: division.alias,
            nombre: division.nombre,
            calle: division.calle,
            numeroExterior: division.numeroExterior,
            numeroInterior: division.numeroInterior,
            colonia: division.colonia,
            codigoPostal: division.codigoPostal,
            ciudad: division.ciudad,
            estado: division.estado,
            pais: division.pais
        };
    };

    function addDivision(division) {
        DivisionService.addDivision(companyID, buildBody(division))
            .then(() => {
                getDivisions(companyID);
                setIsModalOpen(false);
                setDivision(undefined);
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

    function deleteDivision(id) {
        DivisionService.deleteDivision(companyID, id)
            .then(() => getDivisions(companyID))
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    useEffect(() => {
        if (companyID) getDivisions(companyID);
    }, [companyID]);

    return (
        <div className="pt-8">
            <span className="text-lg font-bold">Divisiones</span>
            <DivisionTable
                loading={loading}
                divisions={divisions}
                handleDelete={(id) => deleteDivision(id)}
            />
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-sky-500 text-white p-3 rounded"
            >
                Agregar Division
            </button>

            <DivisionModal
                division={division}
                setDivision={setDivision}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                }}
                countries={countries}
                states={states}
                error={error}
                addDivision={addDivision}
            />
        </div>
    );
}

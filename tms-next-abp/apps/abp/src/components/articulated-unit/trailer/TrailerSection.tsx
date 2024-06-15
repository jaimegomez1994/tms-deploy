import { useEffect, useState } from 'react';
import { ArticulatedUnitService, TrailerService } from '@tms_next_abp/proxy';
import TrailerModal from './TrailerModal';
import TrailersTable from '../../trailer/TrailerTable';
// import TrailersTable from './TrailersTable';
// import TrailerTable from '../shared/account/TrailerTable';
// import TrailerModal from '../shared/account/TrailerModal';

export default function TrailerSection(props) {
    const { articulatedUnitID } = props;

    const [trailers, setTrailers] = useState([]);
    const [parentTrailers, setParentTrailers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchBy, setSearchBy] = useState('');

    const parentFilteredTrailers = parentTrailers?.filter((parentTrailer) => {
        return JSON.stringify(parentTrailer)
            .toLowerCase()
            .includes(searchBy.toLowerCase());
    });

    function getTrailers(articulatedUnitID) {
        setLoading(true);
        ArticulatedUnitService.getTrailerFromArticulatedUnit(articulatedUnitID)
            .then((data) => {
                setTrailers(data.items);
                setLoading(false);
            })
            .catch((error) => {
                setTrailers([]);
                setLoading(false);
                console.log(error);
            });
    }

    function getAllTrailers() {
        setLoading(true);
        TrailerService.trailersGetList()
            .then((data) => {
                setParentTrailers(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const buildBody = (account) => {
        return {
            aliasCuenta: account.aliasCuenta,
            banco: account.banco,
            numeroDeCuenta: account.numeroDeCuenta,
            clabe: account.clabe,
            numeroDeTarjeta: account.numeroDeTarjeta,
            tipoCuentaBancaria: account.tipoCuentaBancaria,
            preDeterminada:
                account?.preDeterminada === 'True' ? 'False' : 'True'
        };
    };

    function addTrailer(trailerID) {
        ArticulatedUnitService.addTrailerToArticulatedUnit(
            articulatedUnitID,
            trailerID
        )
            .then(() => {
                getTrailers(articulatedUnitID);
                setIsModalOpen(false);
                setError('');
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                if (!parsedError) {
                    setError('Error');
                    return;
                }

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = key && value ? `${key}: '${value}'` : 'Error';

                setError(resultError);
            });
    }

    function deleteTrailer(trailerID) {
        ArticulatedUnitService.deleteTrailerFromArticulatedUnit(
            articulatedUnitID,
            trailerID
        )
            .then(() => getTrailers(articulatedUnitID))
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
        if (articulatedUnitID) getTrailers(articulatedUnitID);
    }, [articulatedUnitID]);

    useEffect(() => {
        getAllTrailers();
    }, []);

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <TrailersTable
                    loading={loading}
                    trailers={trailers}
                    handleDelete={(trailerID) => deleteTrailer(trailerID)}
                    handleEdit={() => {
                        console.log('log');
                    }}
                    hideEdit={true}
                />
                <div className="pt-4 pr-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sky-500 text-white p-3 rounded"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            <TrailerModal
                isUpdate={isUpdate}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setIsUpdate(false);
                    setParentTrailers(undefined);
                }}
                trailers={parentFilteredTrailers}
                error={error}
                handleAddition={(trailerID) => {
                    addTrailer(trailerID);
                }}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
            />
        </div>
    );
}

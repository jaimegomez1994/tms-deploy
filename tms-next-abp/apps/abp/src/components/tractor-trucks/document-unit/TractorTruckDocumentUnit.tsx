import { useEffect, useState } from 'react';
import { TractorTruckDocumentUnitService } from '@tms_next_abp/proxy';
import DocumentUnit from '../../shared/document-unit/DocumentUnit';

export default function TractorTruckDocumentUnit(props) {
    const { parentId } = props;

    const [documentUnits, setDocumentUnits] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [documentUnit, setDocumentUnit] = useState();

    function getDocumentUnits(parentId) {
        setLoading(true);
        TractorTruckDocumentUnitService.documentUnitsGetList(parentId)
            .then((data) => {
                setDocumentUnits(data?.items);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setDocumentUnits([]);
                console.log(error);
            });
    }

    function deleteDocumentUnit(docId) {
        TractorTruckDocumentUnitService.deleteDocumentUnit(docId, parentId)
            .then(() => getDocumentUnits(parentId))
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

    function addDocumentUnit(documentUnit) {
        TractorTruckDocumentUnitService.addDocumentUnit(
            parentId,
            buildBody(documentUnit)
        )
            .then(() => {
                getDocumentUnits(parentId);
                setIsModalOpen(false);
                setError('');
                setDocumentUnit(undefined);
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

    const buildBody = (documentUnit) => {
        return {
            nombre: documentUnit.nombre,
            folioDocumento: documentUnit.folioDocumento,
            tipoDocumentoUnidad: documentUnit.tipoDocumentoUnidad,
            fechaExpedicion: documentUnit.fechaExpedicion,
            fechaVencimient: documentUnit.fechaVencimiento
        };
    };

    useEffect(() => {
        if (parentId) getDocumentUnits(parentId);
    }, [parentId]);

    return (
        <DocumentUnit
            loading={loading}
            documentUnits={documentUnits}
            deleteDocumentUnit={deleteDocumentUnit}
            setDocumentUnit={setDocumentUnit}
            setIsModalOpen={setIsModalOpen}
            setIsUpdate={setIsUpdate}
            isUpdate={isUpdate}
            isModalOpen={isModalOpen}
            setError={setError}
            documentUnit={documentUnit}
            error={error}
            addDocumentUnit={addDocumentUnit}
        />
    );
}

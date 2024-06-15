import { regexLettersSpaces } from '../../../utils/Regex';
import ErrorDisplay from '../ErrorDisplay';
import Modal from '../Modal';

export default function DocumentUnitModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        error,
        handleSave,
        isUpdate = false,
        documentUnit,
        setDocumentUnit
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    return (
        <Modal
            title={`Documento`}
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <>
                        {' '}
                        <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                            <span>Nombre: </span>
                            <input
                                className="bg-white p-2 border-2"
                                name="nombre"
                                placeholder="Nombre"
                                value={documentUnit?.nombre}
                                onChange={(e) => {
                                    setDocumentUnit((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }}
                            />
                        </div>
                        <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                            <span>Folio documento: </span>
                            <input
                                className="bg-white p-2 border-2"
                                name="folioDocumento"
                                placeholder="Folio documento"
                                value={documentUnit?.folioDocumento}
                                onChange={(e) => {
                                    setDocumentUnit((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }}
                            />
                        </div>
                        <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                            <span>Tipo documento unidad: </span>
                            <select
                                id="tipoDocumentoUnidad"
                                className="bg-white p-2 border-2"
                                name="tipoDocumentoUnidad"
                                value={documentUnit?.tipoDocumentoUnidad}
                                onChange={(e) =>
                                    setDocumentUnit((prev) => ({
                                        ...prev,
                                        tipoDocumentoUnidad: e.target.value
                                    }))
                                }
                            >
                                <option value="">
                                    Selecciona un tipo de documento
                                </option>
                                {['Placa', 'Permiso', 'Seguro']?.map(
                                    (item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    )
                                )}
                            </select>

                            {/* <input
                                className="bg-white p-2 border-2"
                                name="tipoDocumentoUnidad"
                                placeholder="Tipo documento unidad"
                                value={documentUnit?.tipoDocumentoUnidad}
                                onChange={(e) => {
                                    setDocumentUnit((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }}
                            /> */}
                        </div>
                        <div className="mt-2 sm:pl-[18px] flex flex-col">
                            <span>Fecha de Expedicion:</span>
                            <input
                                className="bg-white p-2 border-2"
                                name="fechaExpedicion"
                                type="date"
                                placeholder="Fecha de Expedicion"
                                value={documentUnit?.fechaExpedicion?.toString()}
                                onChange={(e) => {
                                    setDocumentUnit((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }}
                            />
                        </div>
                        <div className="mt-2 sm:pl-[18px] flex flex-col">
                            <span>Fecha de Vencimiento:</span>
                            <input
                                className="bg-white p-2 border-2"
                                name="fechaVencimiento"
                                type="date"
                                placeholder="Fecha de Vencimiento"
                                value={documentUnit?.fechaVencimiento?.toString()}
                                onChange={(e) => {
                                    setDocumentUnit((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }}
                            />
                        </div>
                    </>
                </div>

                {error && <ErrorDisplay message={error} />}
                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleCloseModal}
                        className="bg-neutral-300 text-white py-3 rounded px-6"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={() => {
                            handleSave(documentUnit);
                        }}
                        className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                    >
                        {label} Documento
                    </button>
                </div>
            </div>
        </Modal>
    );
}

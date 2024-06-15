import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import OperatorAddress from './address/OperatorAddress';
import OperatorBankAccount from './OperatorBankAccountSection';
import OperatorModalForm from './OperatorModalForm';

type Operator = {
    numeroEmpleado: string;
    numeroLicencia: string;
    licenciaCategoria: string;
    licenciaClasificacion: string;
    vigenciaInicio: Date;
    vigenciaFinal: Date;
    fechaAntiguedad: Date;
    nombre: string;
    email: string;
    telefono: number;
    telefonoMovil: number;
    foto: string;
    rfc: string;
    curp: string;
    id: string | undefined;
} | null;

type OperatorModalProps = {
    handleCloseModal: () => void;
    setOperator: (prev: (prevOperator: Operator) => Operator) => void;
    isModalOpen: boolean;
    operator: Operator;
    error: string | boolean;
    handleSave: () => void;
    isUpdate: boolean;
};

export default function OperatorModal(props: OperatorModalProps) {
    const {
        handleCloseModal,
        isModalOpen,
        operator,
        setOperator,
        error,
        handleSave,
        isUpdate
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    return (
        <Modal
            title="Operador"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <OperatorModalForm operator={operator} setOperator={setOperator} />

            {operator?.id && (
                <div className="overflow-auto">
                    <OperatorBankAccount operatorId={operator?.id} />

                    <OperatorAddress operatorId={operator?.id} />
                </div>
            )}

            {error && <ErrorDisplay message={error} />}
            <span className="flex w-[100%] pt-2 border-b"></span>
            <div className="flex justify-end pt-2">
                <button
                    onClick={handleCloseModal}
                    className="bg-neutral-300 text-white py-3 rounded px-6"
                >
                    Cerrar
                </button>
                <button
                    onClick={() => {
                        handleSave();
                    }}
                    // disabled={!enableAddition}
                    className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                >
                    {label}
                </button>
            </div>
        </Modal>
    );
}

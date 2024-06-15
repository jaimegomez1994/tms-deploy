import { useState, useEffect } from 'react';
import { OperatorService } from '@tms_next_abp/proxy';
import OperatorTable from '../../components/operator/OperatorTable';
import AddButton from '../../components/shared/AddButton';
import OperatorModal from '../../components/operator/OperatorModal';
import { validateRFC } from '../../utils/validators';

export default function Operators() {
    const [loading, setLoading] = useState(false);
    const [operators, setOperators] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | boolean>();
    const [isUpdate, setIsUpdate] = useState(false);
    const [operator, setOperator] = useState<Operator | undefined>();

    function buildClientBody(operator) {
        const {
            numeroEmpleado,
            rfc,
            curp,
            numeroLicencia,
            licenciaCategoria,
            licenciaClasificacion,
            vigenciaInicio,
            vigenciaFinal,
            fechaAntiguedad,
            nombre,
            email,
            telefono,
            telefonoMovil,
            foto
        } = operator;

        return {
            numeroEmpleado: numeroEmpleado,
            rfc: rfc,
            curp: curp,
            numeroLicencia: numeroLicencia,
            licenciaCategoria: licenciaCategoria,
            licenciaClasificacion: licenciaClasificacion,
            vigenciaInicio: vigenciaInicio,
            vigenciaFinal: vigenciaFinal,
            fechaAntiguedad: fechaAntiguedad,
            nombre: nombre,
            email: email,
            telefono: telefono,
            telefonoMovil: telefonoMovil,
            foto: 'foto'
        };
    }

    function getOperators() {
        setLoading(true);
        OperatorService.operatorsGetList()
            .then((data) => {
                // console.log('data?.items', data?.items);
                setOperators(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function deleteOperator(id) {
        OperatorService.deleteOperator(id)
            .then(() => getOperators())
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    function addOperator(operator) {
        OperatorService.addOperator(buildClientBody(operator))
            .then(() => {
                getOperators();
                setError('');
                setIsUpdate(true);
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

    function updateOperator(id, operator) {
        OperatorService.updateOperator(id, buildClientBody(operator))
            .then(() => {
                getOperators();
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

    function handleSave() {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(operator?.email)) {
            setError('Formato de correo invalido');
            return;
        }

        const [valid, error] = validateRFC(operator?.rfc);

        if (!valid) {
            setError(error);
        } else {
            if (isUpdate) {
                updateOperator(operator?.id, operator);
            } else {
                addOperator(operator);
            }
        }
    }

    useEffect(() => {
        getOperators();
    }, []);

    useEffect(() => {
        if (operator) {
            const id = operators?.find(
                (item) => item?.rfc === operator?.rfc
            )?.id;
            if (id) {
                setOperator((prev) => ({ ...prev, id: id }));
            }
        }
    }, [operators]);

    return (
        <>
            <OperatorTable
                loading={loading}
                operators={operators}
                handleDelete={(id) => deleteOperator(id)}
                handleEdit={(operator) => {
                    setOperator(operator);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <div className="mt-4">
                <AddButton setIsModalOpen={setIsModalOpen} label="Operador" />
            </div>

            <OperatorModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setIsUpdate(false);
                    setError('');
                    setOperator(undefined);
                }}
                setOperator={setOperator}
                operator={operator}
                handleSave={handleSave}
                error={error}
                isUpdate={isUpdate}
            />

            {/* {errorGrid && <ErrorDisplay message={errorGrid} />} */}
        </>
    );
}

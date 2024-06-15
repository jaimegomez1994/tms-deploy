import {
    regexDecimal,
    regexOnlyNumbersRegex,
    regexLettersNumbersSpaces,
    regexLettersSpaces
} from '../../utils/Regex';

export default function ContractForm(props) {
    const { contract, setContract, contractTypes } = props;
    console.log(contract);
    console.log(
        'contract?.fechaInicio?.toString()',
        contract?.fechaInicio?.toString()
    );

    return (
        <div className="max-h-[60vh] overflow-y-scroll">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Nombre:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="nombre"
                        placeholder="Nombre"
                        value={contract?.nombre}
                        onChange={(e) => {
                            setContract((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero de Contrato:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroContrato"
                        placeholder="numero de contrato"
                        value={contract?.numeroContrato}
                        onChange={(e) => {
                            setContract((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Monto del Contrato:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="montoContrato"
                        placeholder="monto del contrato"
                        value={contract?.montoContrato}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setContract((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Toneladas del Contrato:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="toneladasContrato"
                        placeholder="toneladas del contrato"
                        value={contract?.toneladasContrato}
                        onChange={(e) => {
                            if (
                                regexOnlyNumbersRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setContract((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Estado del Contrato:</span>
                    <select
                        id="estadoContrato"
                        className="bg-white p-2 border-2"
                        name="estadoContrato"
                        value={contract?.estadoContrato}
                        onChange={(e) =>
                            setContract((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }
                    >
                        <option value="">Selecciona</option>
                        {['Activo', 'Inactivo']?.map((item, itemIndex) => (
                            <option key={itemIndex} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Tipo del Contrato:</span>
                    <select
                        id="tipoContrato"
                        className="bg-white p-2 border-2"
                        name="tipoContrato"
                        value={contract?.tipoContrato}
                        onChange={(e) =>
                            setContract((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }
                    >
                        <option value="">Selecciona</option>
                        {['Contrato', 'OrdenDeCompra', 'Cotizacion']?.map(
                            (item, itemIndex) => (
                                <option key={itemIndex} value={item}>
                                    {item}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Fecha de Inicio:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="fechaInicio"
                        type="date"
                        placeholder="Fecha de Inicio"
                        value={contract?.fechaInicio?.toString()}
                        onChange={(e) => {
                            setContract((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Fecha Final:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="fechaFinal"
                        type="date"
                        placeholder="Fecha Final"
                        value={contract?.fechaFinal?.toString()}
                        onChange={(e) => {
                            setContract((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Observaciones:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="observaciones"
                        placeholder="Observaciones"
                        value={contract?.observaciones}
                        onChange={(e) => {
                            // if (
                            //     regexLettersSpaces.test(e.target.value) ||
                            //     e.target.value === ''
                            // ) {
                            setContract((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                            // }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

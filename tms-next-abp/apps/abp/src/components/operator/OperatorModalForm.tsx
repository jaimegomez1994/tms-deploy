import {
    regexLettersNumbers,
    regexLettersSpaces,
    regexOnlyNumbersRegex
} from '../../utils/Regex';

export default function OperatorModalForm(props) {
    const { operator, setOperator } = props;

    return (
        <div className="max-h-[40vh] overflow-y-scroll">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero de Empleado:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroEmpleado"
                        placeholder="Numero de Empleado"
                        value={operator?.numeroEmpleado}
                        onChange={(e) => {
                            setOperator((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero de Licencia:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroLicencia"
                        placeholder="Numero de Licencia"
                        value={operator?.numeroLicencia}
                        onChange={(e) => {
                            setOperator((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Categoria de Licencia:</span>
                    <select
                        id="licenciaCategoria"
                        className="bg-white p-2 border-2"
                        name="licenciaCategoria"
                        value={operator?.licenciaCategoria}
                        onChange={(e) =>
                            setOperator((prev) => ({
                                ...prev,
                                licenciaCategoria: e.target.value
                            }))
                        }
                    >
                        <option value="">Selecciona una categoria</option>
                        {['A', 'B', 'C', 'D', 'E', 'F']?.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Clasificacion de Licencia:</span>
                    <select
                        id="licenciaClasificacion"
                        className="bg-white p-2 border-2"
                        name="licenciaClasificacion"
                        value={operator?.licenciaClasificacion}
                        onChange={(e) =>
                            setOperator((prev) => ({
                                ...prev,
                                licenciaClasificacion: e.target.value
                            }))
                        }
                    >
                        <option value="">Selecciona una clasificacion</option>
                        {['  Estatal', 'Federal']?.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Nombre:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="nombre"
                    placeholder="Nombre del operador"
                    value={operator?.nombre}
                    onChange={(e) => {
                        if (
                            regexLettersSpaces.test(e.target.value) ||
                            e.target.value === ''
                        ) {
                            setOperator((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }
                    }}
                />
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Inicio de vigencia:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="vigenciaInicio"
                    type="date"
                    placeholder="Inicio de vigencia"
                    value={operator?.vigenciaInicio?.toString()}
                    onChange={(e) => {
                        setOperator((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }));
                    }}
                />
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Fin de vigencia:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="vigenciaFinal"
                    type="date"
                    placeholder="Fin de vigencia"
                    value={operator?.vigenciaFinal?.toString()}
                    onChange={(e) => {
                        setOperator((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }));
                    }}
                />
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Fecha de Antiguedad:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="fechaAntiguedad"
                    type="date"
                    placeholder="Fecha de Antiguedad"
                    value={operator?.fechaAntiguedad?.toString()}
                    onChange={(e) => {
                        setOperator((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }));
                    }}
                />
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Email:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="email"
                    placeholder="Email del operador"
                    value={operator?.email}
                    onChange={(e) => {
                        setOperator((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }));
                    }}
                />
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Telefono:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="telefono"
                    placeholder="Telefono del operador"
                    value={operator?.telefono}
                    onChange={(e) => {
                        if (
                            regexOnlyNumbersRegex.test(e.target.value) ||
                            e.target.value === ''
                        ) {
                            setOperator((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }
                    }}
                />
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Telefono Movil:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="telefonoMovil"
                    placeholder="Telefono movil del operador"
                    value={operator?.telefonoMovil}
                    onChange={(e) => {
                        if (
                            regexOnlyNumbersRegex.test(e.target.value) ||
                            e.target.value === ''
                        ) {
                            setOperator((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }
                    }}
                />
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                <span>RFC: </span>
                <input
                    className="bg-white p-2 border-2"
                    name="rfc"
                    placeholder="RFC del operador"
                    value={operator?.rfc}
                    onChange={(e) => {
                        const reg = /^[a-zA-Z0-9]*$/;
                        if (reg.test(e.target.value)) {
                            setOperator((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }
                    }}
                />
            </div>

            <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                <span>Curp: </span>
                <input
                    className="bg-white p-2 border-2"
                    name="curp"
                    placeholder="Curp del operador"
                    value={operator?.curp}
                    onChange={(e) => {
                        if (
                            regexLettersNumbers.test(e.target.value) ||
                            e.target.value === ''
                        ) {
                            setOperator((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }
                    }}
                />
            </div>

            {/* <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
        <span>Foto: </span>
        <input
            type="file"
            className="bg-white p-2 border-2"
            name="foto"
            placeholder="Foto del operador"
            value={operator?.foto}
            onChange={(e) => {
                const reg = /^[a-zA-Z0-9]*$/;
                if (reg.test(e.target.value)) {
                    setOperator((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value
                    }));
                }
            }}
        />
    </div> */}
        </div>
    );
}

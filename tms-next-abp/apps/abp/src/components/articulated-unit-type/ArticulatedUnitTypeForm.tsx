import { regexDecimal } from '../../utils/Regex';

export default function ArticulatedUnitTypeForm(props) {
    const { articulatedUnitType, setArticulatedUnitType } = props;

    return (
        <div className="max-h-[60vh] overflow-y-scroll">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Nombre:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="nombre"
                        placeholder="Nombre"
                        value={articulatedUnitType?.nombre}
                        onChange={(e) => {
                            setArticulatedUnitType((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Capacidad(toneladas):</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="capacidad"
                        placeholder="Capacidad"
                        value={articulatedUnitType?.capacidad}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setArticulatedUnitType((prev) => ({
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
                    <span>Remolques:</span>
                    <select
                        id="remolques"
                        className="bg-white p-2 border-2"
                        name="remolques"
                        value={articulatedUnitType?.remolques}
                        onChange={(e) =>
                            setArticulatedUnitType((prev) => ({
                                ...prev,
                                remolques: e.target.value
                            }))
                        }
                    >
                        <option value="">
                            Selecciona cantidad de remolques
                        </option>
                        {['0', '1', '2']?.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Descripcion:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="descripcion"
                        placeholder="Descripcion"
                        value={articulatedUnitType?.descripcion}
                        onChange={(e) => {
                            setArticulatedUnitType((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

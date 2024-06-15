import { regexDecimal, regexOnlyNumbersRegex } from "../../utils/Regex";

export default function RouteForm(props) {
    const { route, setRoute } = props;

    return (
        <div className="max-h-[60vh] overflow-y-scroll">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Alias:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="alias"
                        placeholder="Alias"
                        value={route?.alias}
                        onChange={(e) => {
                            setRoute((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Nombre:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="nombre"
                        placeholder="Nombre"
                        value={route?.nombre}
                        onChange={(e) => {
                            setRoute((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Origen:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="origen"
                        placeholder="Origen"
                        value={route?.origen}
                        onChange={(e) => {
                            setRoute((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Destino:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="destino"
                        placeholder="Destino"
                        value={route?.destino}
                        onChange={(e) => {
                            setRoute((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Distancia:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="distancia"
                        placeholder="Distancia"
                        value={route?.distancia}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setRoute((prev) => ({
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
                    <span>Tiempo Aproximado Vacio:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="tiempoAproxVacio"
                        placeholder="Tiempo Aproximado Vacio"
                        value={route?.tiempoAproxVacio}
                        onChange={(e) => {
                            if (
                                regexOnlyNumbersRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setRoute((prev) => ({
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
                    <span>Tiempo Aproximado Cargado:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="tiempoAproxCargado"
                        placeholder="Tiempo Aproximado Cargado"
                        value={route?.tiempoAproxCargado}
                        onChange={(e) => {
                            if (
                                regexOnlyNumbersRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setRoute((prev) => ({
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
                    <span>Observaciones:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="observaciones"
                        placeholder="Observaciones"
                        value={route?.observaciones}
                        onChange={(e) => {
                            setRoute((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
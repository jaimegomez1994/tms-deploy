export default function AccessoryUnitForm(props) {
    const { accessoryUnit, setAccessoryUnit } = props;

    return (
        <div className="max-h-[60vh] overflow-y-scroll">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero Economico:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroEconomico"
                        placeholder="Numero Economico"
                        value={accessoryUnit?.numeroEconomico}
                        onChange={(e) => {
                            setAccessoryUnit((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero Serie:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroSerie"
                        placeholder="Numero Serie"
                        value={accessoryUnit?.numeroSerie}
                        onChange={(e) => {
                            setAccessoryUnit((prev) => ({
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
                        value={accessoryUnit?.nombre}
                        onChange={(e) => {
                            setAccessoryUnit((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Descripcion:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="descripcion"
                        placeholder="Descripcion"
                        value={accessoryUnit?.descripcion}
                        onChange={(e) => {
                            setAccessoryUnit((prev) => ({
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

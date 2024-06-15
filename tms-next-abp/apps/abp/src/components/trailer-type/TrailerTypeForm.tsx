export default function TrailerTypeForm(props) {
    const { trailerType, setTrailerType } = props;

    return (
        <div className="max-h-[60vh] overflow-y-scroll">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Nombre:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="nombre"
                        placeholder="Nombre"
                        value={trailerType?.nombre}
                        onChange={(e) => {
                            setTrailerType((prev) => ({
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
                        value={trailerType?.descripcion}
                        onChange={(e) => {
                            setTrailerType((prev) => ({
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

import { useEffect, useState } from 'react';
import { ArticulatedUnitTypeService } from '@tms_next_abp/proxy';

export default function ArticulatedUnitForm(props) {
    const { articulatedUnit, setArticulatedUnit } = props;

    const [articulatedUnitTypes, setArticulatedUnitTypes] = useState([]);

    function getArticulatedUnitTypes() {
        ArticulatedUnitTypeService.articulatedUnitTypesGetList()
            .then((data) => {
                setArticulatedUnitTypes(data?.items);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getArticulatedUnitTypes();
    }, []);

    return (
        <div className="max-h-[60vh]">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Alias:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="alias"
                        placeholder="Alias"
                        value={articulatedUnit?.alias}
                        onChange={(e) => {
                            setArticulatedUnit((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Tipo de Unidad Articulada:</span>
                    <select
                        id="tipoUnidadArticulada"
                        name="tipoUnidadArticulada"
                        className="bg-white p-3 border-2"
                        value={articulatedUnit?.tipoUnidadArticulada}
                        onChange={(e) => {
                            setArticulatedUnit((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    >
                        <option value="">
                            Selecciona una tipo de Unidad Articulada:
                        </option>
                        {articulatedUnitTypes?.map((articulatedUnitType) => (
                            <option
                                key={articulatedUnitType.id}
                                value={articulatedUnitType.nombre}
                            >
                                {articulatedUnitType.nombre}
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
                        value={articulatedUnit?.descripcion}
                        onChange={(e) => {
                            setArticulatedUnit((prev) => ({
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

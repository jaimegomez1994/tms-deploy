import { useState } from 'react';
import Modal from '../shared/Modal';
import { Currency } from '../../utils/Currency';
import { UOMS } from '../../utils/Uoms';
import ErrorDisplay from '../shared/ErrorDisplay';

export default function ProductModal(props) {
    const {
        isModalOpen,
        onCloseModal,
        handleSave,
        error,
        product,
        setProduct,
        isUpdate = false
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    const handleCloseModal = () => {
        setProduct(undefined);
        onCloseModal();
    };

    const requiredFields = [
        'clave',
        'moneda',
        'nombre',
        'tipoProducto',
        'precioUnitario'
    ];

    //todo improve with requiredFields array
    const enableAddition: boolean =
        product?.hasOwnProperty('clave') &&
        product?.hasOwnProperty('moneda') &&
        product?.hasOwnProperty('nombre') &&
        product?.hasOwnProperty('tipoProducto') &&
        product?.hasOwnProperty('precioUnitario');

    return (
        <>
            <Modal
                title={`${label} producto:`}
                isModalOpen={isModalOpen}
                onCloseModal={handleCloseModal}
            >
                <div className="text-sm font-normal text-neutral-500">
                    <div className="mt-2 sm:pl-[18px] flex flex-col">
                        <span>Nombre:</span>
                        <input
                            className="bg-white p-2 border-2"
                            name="nombre"
                            placeholder="Nombre del producto"
                            value={product?.nombre}
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    nombre: e.target.value
                                }))
                            }
                        />
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Clave: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="clave"
                            placeholder="Clave del producto"
                            value={product?.clave}
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }))
                            }
                        />
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Tipo de Producto: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="tipoProducto"
                            placeholder="Tipo de producto"
                            value={product?.tipoProducto}
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }))
                            }
                        />
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Precio Unitario: </span>
                        <input
                            type="number"
                            className="bg-white p-2 border-2 "
                            name="precioUnitario"
                            placeholder="0"
                            value={product?.precioUnitario}
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }))
                            }
                        />
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Moneda: </span>
                        <select
                            id="moneda"
                            className="bg-white p-3 border-2"
                            value={Currency[product?.moneda]}
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    moneda: Currency.indexOf(e.target.value)
                                }))
                            }
                        >
                            <option value="">Selecciona una moneda</option>
                            {Currency?.map((currency, index) => (
                                <option key={index} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Tipo de Unidad: </span>
                        <select
                            id="tipoDeUnidad"
                            className="bg-white p-3 border-2"
                            value={UOMS[product?.tipoDeUnidad]}
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    tipoDeUnidad: UOMS.indexOf(e.target.value)
                                }))
                            }
                        >
                            <option value="">
                                Selecciona un tipo de unidad
                            </option>
                            {UOMS?.map((unit, index) => (
                                <option key={index} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
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
                                handleSave(product);
                            }}
                            disabled={!enableAddition}
                            className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                        >
                            {label}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

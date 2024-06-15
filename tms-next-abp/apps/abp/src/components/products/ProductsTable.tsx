import { Currency } from '../../utils/Currency';
import { UOMS } from '../../utils/Uoms';
import ActionsMenuDropdown from '../shared/ActionsMenuDropdown';

export default function ProductsTable(props) {
    const {
        loading,
        products,
        deleteProduct,
        setProduct,
        setIsModalOpen,
        setIsUpdate
    } = props;
    return (
        <table className="overflow-auto max-h-[60%] max-w-[90%] mb-8">
            <tbody className="text-sm font-normal text-neutral-500">
                <tr className="border-b-2 text-left">
                    <th className="px-8">Producto</th>
                    <th className="px-8">Clave</th>
                    <th className="px-8">Tipo de producto</th>
                    <th className="px-8">Precio unitario</th>
                    <th className="px-8">Moneda</th>
                    <th className="px-8">Tipo de unidad</th>
                    <th className="px-4">Peligroso</th>
                    <th className="px-8">Norma aplicable</th>
                    <th className="px-8">Actions</th>
                </tr>
                {loading ? (
                    <tr>
                        <td colSpan={4} className="text-center">
                            Loading...
                        </td>
                    </tr>
                ) : (
                    products?.map((product) => {
                        const {
                            id,
                            nombre,
                            tipoProducto,
                            clave,
                            precioUnitario,
                            moneda,
                            tipoDeUnidad,
                            peligroso,
                            normaAplicable
                        } = product;

                        return (
                            <tr
                                className="border-t border-dashed border-b"
                                key={id}
                            >
                                <td className="px-8 py-2 font-normal text-left">
                                    {nombre}
                                </td>
                                <td className="px-8 py-2 font-normal text-left">
                                    {clave}
                                </td>
                                <td className="px-8 py-2 font-normal text-left">
                                    {tipoProducto}
                                </td>
                                <td className="px-8 py-2 font-normal text-left">
                                    {precioUnitario || '0'}
                                </td>
                                <td className="px-8 py-2 font-normal text-left">
                                    {typeof moneda === 'number'
                                        ? Currency[moneda]
                                        : ''}
                                </td>
                                <td className="px-8 py-2 font-normal text-left">
                                    {typeof tipoDeUnidad === 'number'
                                        ? UOMS[tipoDeUnidad]
                                        : ''}
                                </td>
                                <td className="px-4 py-2 font-normal text-left">
                                    {peligroso === 1 ? 'Si' : 'No'}
                                </td>
                                <td className="px-8 py-2 font-normal text-left">
                                    {normaAplicable}
                                </td>
                                <td className="px-8 py-2 font-normal text-left relative">
                                    <ActionsMenuDropdown
                                        id={product.id}
                                        onEdit={() => {
                                            setProduct(product);
                                            setIsUpdate(true);
                                            setIsModalOpen(true);
                                        }}
                                        onDelete={() => deleteProduct(id)}
                                    />
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
}

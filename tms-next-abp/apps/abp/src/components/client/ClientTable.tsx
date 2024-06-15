import { LEGAL_ENTITIES } from '../../utils/LegalEntity';
import ActionsMenuDropdown from '../shared/ActionsMenuDropdown';
import LoadingTable from '../shared/LoadingTable';

export default function ClientTable(props) {
    const {
        loading,
        clients,
        deleteClient,
        setClient,
        setIsModalOpen,
        setIsUpdate
    } = props;

    return (
        <div className="overflow-auto max-h-[67%] mb-8">
            <table className="overflow-auto max-h-[60%] max-w-[90%] mb-8">
                <tbody className="text-sm font-normal text-neutral-500">
                    <tr className="border-b-2 text-left">
                        <th className="px-8">Nombre</th>
                        <th className="px-8">RFC</th>
                        <th className="px-8">Entidad</th>
                        <th className="px-8">Calle</th>
                        <th className="px-8">Colonia</th>
                        <th className="px-8">Codigo Postal</th>
                        <th className="px-4">Ciudad</th>
                        <th className="px-8">Estado</th>
                        <th className="px-8">Pais</th>
                    </tr>
                    {loading ? (
                        <LoadingTable />
                    ) : (
                        clients?.map((client, index) => {
                            const {
                                nombre,
                                rfc,
                                tipoEntidadLegal,
                                calle,
                                colonia,
                                codigoPostal,
                                ciudad,
                                estado,
                                pais,
                                id
                            } = client;

                            return (
                                <tr
                                    className="border-t border-dashed border-b"
                                    key={index}
                                >
                                    <td className="px-8 py-2 font-normal text-left">
                                        {nombre}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {rfc}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {LEGAL_ENTITIES[tipoEntidadLegal]}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {calle}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {colonia}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {codigoPostal}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {ciudad}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {estado}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {pais}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left relative">
                                        <ActionsMenuDropdown
                                            id={client.id}
                                            onEdit={() => {
                                                setClient(client);
                                                setIsUpdate(true);
                                                setIsModalOpen(true);
                                            }}
                                            onDelete={() => deleteClient(id)}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

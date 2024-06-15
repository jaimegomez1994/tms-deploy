import ActionsMenuDropdown from '../shared/ActionsMenuDropdown';

export default function Table(props) {
    const {
        countries,
        setCurrentCountry,
        setIsModalUpdateOpen,
        deleteCountry,
        loading
    } = props;

    return (
        <table className="overflow-auto max-h-[60%] mb-8">
            <tbody className="text-sm font-normal text-neutral-500">
                <tr className="border-b-2 text-left">
                    <th className="px-8">Pais</th>
                    <th className="px-8">Actions</th>
                </tr>
                {loading ? (
                    <tr>
                        <td colSpan={2} className="text-center">
                            Loading...
                        </td>
                    </tr>
                ) : (
                    countries?.map((pais) => {
                        const { id, nombre } = pais;
                        return (
                            <tr
                                className="border-t border-dashed border-b"
                                key={id}
                            >
                                <td className="px-8 py-2 font-normal text-left">
                                    {nombre}
                                </td>
                                <td className="px-8 py-2 font-normal text-left relative">
                                    <ActionsMenuDropdown
                                        id={pais.id}
                                        onEdit={() => {
                                            setCurrentCountry({
                                                id: id,
                                                countryName: nombre
                                            });
                                            setIsModalUpdateOpen(true);
                                        }}
                                        onDelete={() => deleteCountry(id)}
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

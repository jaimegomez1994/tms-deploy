import ActionsMenuDropdown from '../shared/ActionsMenuDropdown';
import LoadingTable from '../shared/LoadingTable';

import { LEGAL_ENTITIES } from '../../utils/LegalEntity';

export default function CompanyTable(props) {
    const { loading, headers, companies, cells, handleDelete, handleEdit } =
        props;

    return (
        <div className="overflow-auto max-h-[67%] mb-8">
            <table className="overflow-auto max-h-[60%] max-w-[90%] mb-8">
                <tbody className="text-sm font-normal text-neutral-500">
                    <tr className="border-b-2 text-left">
                        {headers?.map((header) => (
                            <th className="px-8">{header}</th>
                        ))}
                    </tr>
                    {loading ? (
                        <LoadingTable />
                    ) : (
                        companies?.map((company, index) => {
                            const {
                                tipoEntidadLegal,
                                domFiscalCalle,
                                domFiscalNumeroExterior,
                                domFiscalColonia,
                                domFiscalEstado
                            } = company;

                            return (
                                <tr
                                    className="border-t border-dashed border-b"
                                    key={index}
                                >
                                    {cells?.map((cell) => (
                                        <td className="px-8 py-2 font-normal text-left">
                                            {company[cell]}
                                        </td>
                                    ))}
                                    <td className="px-8 py-2 font-normal text-left">
                                        {LEGAL_ENTITIES[tipoEntidadLegal]}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left">
                                        {`${domFiscalCalle} ${domFiscalNumeroExterior}, ${domFiscalColonia}, ${domFiscalEstado}`}
                                    </td>
                                    <td className="px-8 py-2 font-normal text-left relative">
                                        <ActionsMenuDropdown
                                            id={company.id}
                                            onEdit={() => {
                                                handleEdit(company);
                                            }}
                                            onDelete={() => {
                                                handleDelete(company.id);
                                            }}
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

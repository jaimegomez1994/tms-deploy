import ActionsMenuDropdown from './ActionsMenuDropdown';
import LoadingTable from './LoadingTable';

type TableProps = {
    headers: string[];
    loading: boolean;
    cells: string[];
    rows: { [key: string]: string }[];
    handleDelete: (id: string) => void;
    handleEdit: (row: unknown) => void;
    setItem: (item: { [key: string]: string }) => void;
    size?: 'xs' | 'small' | 'medium' | 'large';
    hideEdit?: boolean;
    customCells?: string[];
};

export default function Table(props: TableProps) {
    const {
        headers,
        loading,
        cells,
        rows,
        handleDelete,
        handleEdit,
        size = 'small',
        hideEdit = false,
        customCells
    } = props;

    const fontSizeClass = () => {
        if (size === 'xs') {
            return 'text-xs';
        } else if (size === 'small') {
            return 'text-sm';
        }
    };

    const paddingXClass = () => {
        if (size === 'xs') {
            return 'px-2';
        } else if (size === 'small') {
            return 'px-8';
        }
    };

    return (
        <div
            className={`overflow-auto ${
                size === 'xs' ? ' max-h-[200px]' : 'max-h-[67%]'
            } `}
        >
            <table
                className={`overflow-auto max-h-[60%] max-w-[90%]  ${
                    size === 'xs' ? 'mb-9' : 'mb-14'
                }`}
            >
                <tbody
                    className={`${fontSizeClass()} font-normal text-neutral-500`}
                >
                    <tr className="border-b-2 text-left">
                        <th className={`${paddingXClass()}`}></th>
                        {headers?.map((header) => (
                            <th className={`${paddingXClass()}`}>{header}</th>
                        ))}
                    </tr>
                    {loading ? (
                        <LoadingTable />
                    ) : (
                        rows?.map((row, index) => {
                            return (
                                <tr
                                    className="border-t border-dashed border-b"
                                    key={index}
                                >
                                    <td
                                        className={`${paddingXClass()} py-2 font-normal ${fontSizeClass()} text-left relative`}
                                    >
                                        <ActionsMenuDropdown
                                            id={row.id}
                                            onEdit={() => {
                                                handleEdit(row);
                                            }}
                                            onDelete={() =>
                                                handleDelete(row.id)
                                            }
                                            hideEdit={hideEdit}
                                        />
                                    </td>
                                    {cells?.map((cell) => (
                                        <td
                                            className={`${paddingXClass()} py-2 font-normal ${fontSizeClass()} text-left`}
                                        >
                                            {row[cell]}
                                        </td>
                                    ))}

                                    {customCells?.map((cell) => (
                                        <td
                                            className={`${paddingXClass()} py-2 font-normal ${fontSizeClass()} text-left`}
                                        >
                                            <input
                                                type="checkbox"
                                                disabled={true}
                                                checked={
                                                    row[cell] === 'True'
                                                        ? true
                                                        : false
                                                }
                                            ></input>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

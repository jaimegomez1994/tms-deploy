import LoadingTable from '../../shared/LoadingTable';

type TableProps = {
    headers: string[];
    loading: boolean;
    cells: string[];
    rows: { [key: string]: string }[];
    handleAddition: (id: string) => void;
    size?: 'xs' | 'small' | 'medium' | 'large';
    customCells?: string[];
};

export default function Table(props: TableProps) {
    const {
        headers,
        loading,
        cells,
        rows,
        handleAddition,
        size = 'small',
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
                                        <button
                                            onClick={() =>
                                                handleAddition(row.id)
                                            }
                                            className="flex justify-content items-center bg-zinc-300 p-2 rounded relative"
                                        >
                                            Agregar
                                        </button>
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

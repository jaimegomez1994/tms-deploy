type AddButtonProps = {
    setIsModalOpen: (value: boolean) => void;
    label: string;
};

export default function AddButton(props: AddButtonProps) {
    const { setIsModalOpen, label } = props;
    return (
        <button
            onClick={() => setIsModalOpen(true)}
            className="bg-sky-500 text-white p-3 rounded"
        >
            {`Agregar ${label}`}
        </button>
    );
}

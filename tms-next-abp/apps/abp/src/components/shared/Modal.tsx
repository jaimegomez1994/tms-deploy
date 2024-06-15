import ReactModal from 'react-modal';

export default function Modal(props) {
    const { children, isModalOpen, title, onCloseModal } = props;

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'white'
        }
    };

    return (
        <ReactModal
            style={customStyles}
            className="absolute w-full bg-white top-[50%] left-[50%]  max-w-[580px] sm:max-w-[640px] md:max-w-[700px] lg:max-w-[900px] right-auto bottom-auto border-2 sm:p-4"
            isOpen={isModalOpen}
            ariaHideApp={false}
        >
            <div className="text-sm font-normal text-neutral-500">
                <header className="flex justify-between align-items">
                    <div className="font-bold text-xl">{title}</div>
                    <button
                        className="font-bold text-xl"
                        onClick={() => {
                            onCloseModal();
                        }}
                    >
                        x
                    </button>
                </header>
                {children}
            </div>
        </ReactModal>
    );
}

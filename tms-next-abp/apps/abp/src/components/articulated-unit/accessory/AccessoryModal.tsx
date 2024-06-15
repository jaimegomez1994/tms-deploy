import Modal from '../../shared/Modal';
import Search from '../../shared/search/Search';
import AccessoryTable from './AccessoryTable';

export default function AccessoryModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        accessories,
        handleAddition,
        searchBy,
        setSearchBy
    } = props;

    return (
        <Modal
            title="Accesorios"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="pt-2 pb-10">
                <div className="flex flex-col">
                    <Search
                        searchBy={searchBy}
                        setSearchBy={setSearchBy}
                        labelPlaceHolder="accesorio"
                    />
                    <AccessoryTable
                        loading={false}
                        accessories={accessories}
                        handleAddition={handleAddition}
                    />
                </div>
            </div>
        </Modal>
    );
}

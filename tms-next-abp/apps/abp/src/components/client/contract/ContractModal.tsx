import Modal from '../../shared/Modal';
import Search from '../../shared/search/Search';
import ContractsTable from './ContractsTable';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ContractModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        contracts,
        handleAddition,
        searchBy,
        setSearchBy
    } = props;

    return (
        <Modal
            title="Contrato"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="pt-2 pb-10">
                <div className="flex flex-col">
                    <Search
                        searchBy={searchBy}
                        setSearchBy={setSearchBy}
                        labelPlaceHolder={'contrato'}
                    />
                    <ContractsTable
                        loading={false}
                        contracts={contracts}
                        handleAddition={handleAddition}
                    />
                </div>
            </div>
        </Modal>
    );
}

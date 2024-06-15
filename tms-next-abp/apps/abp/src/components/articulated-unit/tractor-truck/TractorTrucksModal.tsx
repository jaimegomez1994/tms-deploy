import { useEffect } from 'react';
import Modal from '../../shared/Modal';
import Search from '../../shared/search/Search';
import TractorTrucksTable from './TractorTrucksTable';

export default function TractorTruckModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        tractorTrucks,
        handleAddition,
        searchBy,
        setSearchBy
    } = props;

    return (
        <Modal
            title="Tractocamion"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="pt-2 pb-10">
                <div className="flex flex-col">
                    <Search
                        searchBy={searchBy}
                        setSearchBy={setSearchBy}
                        labelPlaceHolder={'tractocamion'}
                    />
                    <TractorTrucksTable
                        loading={false}
                        tractorTrucks={tractorTrucks}
                        handleAddition={(id) => {
                            handleAddition(id);
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
}

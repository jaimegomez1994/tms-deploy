import Modal from '../../shared/Modal';
import Search from '../../shared/search/Search';
import ArticulatedUnitsTable from './ArticulatedUnitsTable';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ArticulatedUnitModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        articulatedUnits,
        handleAddition,
        searchBy,
        setSearchBy
    } = props;

    return (
        <Modal
            title="Unidad Articulada"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="pt-2 pb-10">
                <div className="flex flex-col">
                    <Search
                        searchBy={searchBy}
                        setSearchBy={setSearchBy}
                        labelPlaceHolder={'unidad articulada'}
                    />
                    <ArticulatedUnitsTable
                        loading={false}
                        articulatedUnits={articulatedUnits}
                        handleAddition={handleAddition}
                    />
                </div>
            </div>
        </Modal>
    );
}

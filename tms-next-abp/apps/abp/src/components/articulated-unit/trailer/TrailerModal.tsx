import Modal from '../../shared/Modal';
import Search from '../../shared/search/Search';
import TrailersTable from './TrailersTable';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function TrailerModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        trailers,
        handleAddition,
        searchBy,
        setSearchBy
    } = props;

    return (
        <Modal
            title="Remolque"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="pt-2 pb-10">
                <div className="flex flex-col">
                    <Search
                        searchBy={searchBy}
                        setSearchBy={setSearchBy}
                        labelPlaceHolder={'remolque'}
                    />
                    <TrailersTable
                        loading={false}
                        trailers={trailers}
                        handleAddition={handleAddition}
                    />
                </div>
            </div>
        </Modal>
    );
}

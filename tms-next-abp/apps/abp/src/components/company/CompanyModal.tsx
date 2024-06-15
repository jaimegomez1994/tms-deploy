import { getLegalEntityType } from '../../utils/LegalEntity';
import { validateRFC } from '../../utils/validators';
import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import TaxResidence from './components/TaxResidence';
import CompanyMainInfo from './components/CompanyMainInfo';
import DivisionSection from '../divisions/DivisionSection';
import AccountSection from '../accounts/AccountSection';

export default function CompanyModal(props) {
    const {
        isModalOpen,
        onCloseModal,
        handleSave,
        error,
        company,
        setCompany,
        setError,
        countries,
        states,
        isUpdate = false,
        setIsUpdate
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    const handleCloseModal = () => {
        setCompany(undefined);
        onCloseModal();
        setIsUpdate(false);
    };

    const requiredFields = ['alias', 'nombre', 'rfc'];

    const enableAddition = requiredFields.every((requiredField) => {
        return (
            company?.hasOwnProperty(requiredField) &&
            company[requiredField] !== ''
        );
    });

    return (
        <Modal
            title={`${label} empresa:`}
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div>
                <div className="text-sm font-normal text-neutral-500 max-h-[70vh] overflow-y-auto overflow-x-hidden">
                    <CompanyMainInfo
                        company={company}
                        setCompany={setCompany}
                    />

                    <TaxResidence
                        company={company}
                        setCompany={setCompany}
                        countries={countries}
                        states={states}
                    />

                    {company?.id && (
                        <>
                            <DivisionSection
                                companyID={company?.id}
                                countries={countries}
                                states={states}
                            ></DivisionSection>

                            <AccountSection companyID={company?.id} />
                        </>
                    )}
                </div>
                {error && <ErrorDisplay message={error} />}
                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleCloseModal}
                        className="bg-neutral-300 text-white py-3 rounded px-6"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={() => {
                            const [isValid, message] = validateRFC(company.rfc);
                            if (isValid) {
                                company.tipoEntidadLegal = getLegalEntityType(
                                    company.rfc
                                );
                                handleSave(company);
                            } else {
                                setError(message);
                            }
                        }}
                        disabled={!enableAddition}
                        className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                    >
                        {label}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

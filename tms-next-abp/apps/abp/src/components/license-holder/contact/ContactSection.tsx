import { useEffect, useState } from 'react';
import { LicenseHolderService } from '@tms_next_abp/proxy';
import ContactTable from './ContactTable';
import ContactModal from './ContactModal';

type ContactType = {
    aliasCuenta: string;
    banco: string;
    numeroDeCuenta: string;
    clabe: string;
    tipoCuentaBancaria: string;
    numeroDeTarjeta: string;
    predeterminada: boolean;
};

export default function ContactSection(props) {
    const { licenseHolderID } = props;

    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contact, setContact] = useState<ContactType | undefined>();

    function getContacts(licenseHolderID) {
        setLoading(true);
        LicenseHolderService.getContactsFromLicenseHolder(licenseHolderID)
            .then((data) => {
                setContacts(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const buildBody = (contact) => {
        return {
            nombre: contact.nombre,
            email: contact.email,
            telefono: contact.telefono,
            telefonoMovil: contact.telefonoMovil
        };
    };

    function addContact(contact) {
        LicenseHolderService.addContactToLicenseHolder(
            licenseHolderID,
            buildBody(contact)
        )
            .then(() => {
                getContacts(licenseHolderID);
                setIsModalOpen(false);
                setError('');
                setContact(undefined);
            })
            .catch((error) => {
                console.log('Error', error);

                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = key && value ? `${key}: '${value}'` : 'Error';

                setError(resultError);
            });
    }

    function deleteContact(id) {
        console.log('id', id);
        console.log('licenseHolderID', licenseHolderID);

        LicenseHolderService.deleteContactsFromLicenseHolder(
            licenseHolderID,
            id
        )
            .then(() => getContacts(licenseHolderID))
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    useEffect(() => {
        if (licenseHolderID) getContacts(licenseHolderID);
    }, [licenseHolderID]);

    return (
        <div className="pt-8">
            <span className="text-lg font-bold">Contactos</span>
            <div className="flex justify-between">
                <ContactTable
                    loading={loading}
                    contacts={contacts}
                    handleDelete={(id) => deleteContact(id)}
                    handleEdit={() => {
                        console.log('log');
                    }}
                    hideEdit={true}
                />
                <div className="pt-4 pr-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sky-500 text-white p-3 rounded"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            <ContactModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setContact(undefined);
                }}
                contact={contact}
                setContact={setContact}
                error={error}
                handleSave={(contact) => {
                    addContact(contact);
                }}
                isDefault={contacts.length === 0}
            />
        </div>
    );
}

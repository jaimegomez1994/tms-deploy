import { useEffect, useState } from 'react';
import { LicenseHolderService } from '@tms_next_abp/proxy';
import BankAccountTable from './BankAccountTable';
import BankAccountModal from './BankAccountModal';

type AccountType = {
    aliasCuenta: string;
    banco: string;
    numeroDeCuenta: string;
    clabe: string;
    tipoCuentaBancaria: string;
    numeroDeTarjeta: string;
    predeterminada: boolean;
};

export default function AccountSection(props) {
    const { licenseHolderID } = props;

    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [account, setAccount] = useState<AccountType | undefined>();

    function getAccounts(licenseHolderID) {
        setLoading(true);
        LicenseHolderService.getBankAccountFromLicenseHolder(licenseHolderID)
            .then((data) => {
                setAccounts(data?.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const buildBody = (account) => {
        return {
            aliasCuenta: account.aliasCuenta,
            banco: account.banco,
            numeroDeCuenta: account.numeroDeCuenta,
            clabe: account.clabe,
            numeroDeTarjeta: account.numeroDeTarjeta,
            tipoCuentaBancaria: account.tipoCuentaBancaria,
            preDeterminada:
                account?.preDeterminada === 'True' ? 'False' : 'True'
        };
    };

    function addBankAccount(account) {
        LicenseHolderService.addBankAccountToLicenseHolder(
            licenseHolderID,
            buildBody(account)
        )
            .then(() => {
                getAccounts(licenseHolderID);
                setIsModalOpen(false);
                setError('');
                setAccount(undefined);
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

    function deleteAccount(id) {
        LicenseHolderService.deleteBankAccountFromLicenseHolder(
            licenseHolderID,
            id
        )
            .then(() => getAccounts(licenseHolderID))
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
        if (licenseHolderID) getAccounts(licenseHolderID);
    }, [licenseHolderID]);

    return (
        <div className="pt-8">
            <span className="text-lg font-bold">Cuentas Bancarias</span>
            <div className="flex justify-between">
                <BankAccountTable
                    loading={loading}
                    accounts={accounts}
                    handleDelete={(id) => deleteAccount(id)}
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

            <BankAccountModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setAccount(undefined);
                }}
                account={account}
                setAccount={setAccount}
                error={error}
                handleSave={(account) => {
                    addBankAccount(account);
                }}
                isDefault={accounts.length === 0}
            />
        </div>
    );
}

import { useEffect, useState } from 'react';
import { BankAccountService } from '@tms_next_abp/proxy';
import AccountTable from '../shared/account/AccountTable';
import AccountModal from '../shared/account/AccountModal';

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
    const { companyID } = props;

    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [account, setAccount] = useState<AccountType | undefined>();

    function getAccounts(companyID) {
        setLoading(true);
        BankAccountService.bankAccountGetList(companyID)
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
        BankAccountService.addBankAccount(companyID, buildBody(account))
            .then(() => {
                getAccounts(companyID);
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

    function updateBankAccount(account) {
        BankAccountService.updateBankAccount(
            companyID,
            account.id,
            buildBody(account)
        )
            .then(() => {
                getAccounts(companyID);
                setIsModalOpen(false);
                setIsUpdate(false);
                setAccount(undefined);
                setError('');
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = key && value ? `${key}: '${value}'` : 'Error';

                setError(resultError);
            });
    }

    function deleteAccount(id) {
        BankAccountService.deleteBankAccount(companyID, id)
            .then(() => getAccounts(companyID))
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
        if (companyID) getAccounts(companyID);
    }, [companyID]);

    return (
        <div className="pt-8">
            <span className="text-lg font-bold">Cuentas Bancarias</span>
            <AccountTable
                loading={loading}
                accounts={accounts}
                handleDelete={(id) => deleteAccount(id)}
                handleEdit={(account) => {
                    setAccount(account);
                    setIsModalOpen(true);
                    setIsUpdate(true);
                }}
            />
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-sky-500 text-white p-3 rounded"
            >
                Agregar Cuenta
            </button>

            <AccountModal
                isUpdate={isUpdate}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setIsUpdate(false);
                    setAccount(undefined);
                }}
                account={account}
                setAccount={setAccount}
                error={error}
                handleSave={(account) => {
                    if (isUpdate) {
                        updateBankAccount(account);
                    } else {
                        addBankAccount(account);
                    }
                }}
                isDefault={accounts.length === 0}
            />
        </div>
    );
}

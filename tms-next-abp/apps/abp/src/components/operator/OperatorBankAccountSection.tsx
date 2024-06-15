import { useEffect, useState } from 'react';
import { OperatorBankAccountService } from '@tms_next_abp/proxy';
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

export default function OperatorBankAccount(props) {
    const { operatorId } = props;

    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [account, setAccount] = useState<AccountType | undefined>();

    function getAccounts(operatorId) {
        setLoading(true);
        OperatorBankAccountService.bankAccountGetList(operatorId)
            .then((data) => {
                setAccounts([data]);
                setLoading(false);
            })
            .catch((error) => {
                setAccounts([]);
                setLoading(false);
                console.log(error);
            });
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
        OperatorBankAccountService.addBankAccount(
            operatorId,
            buildBody(account)
        )
            .then(() => {
                getAccounts(operatorId);
                setIsModalOpen(false);
                setError('');
                setAccount(undefined);
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                if (!parsedError) {
                    setError('Error');
                    return;
                }

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = key && value ? `${key}: '${value}'` : 'Error';

                setError(resultError);
            });
    }

    function deleteAccount(id) {
        OperatorBankAccountService.deleteBankAccount(operatorId, id)
            .then(() => getAccounts(operatorId))
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
        if (operatorId) getAccounts(operatorId);
    }, [operatorId]);

    return (
        <div className="pt-8">
            <span className="text-lg font-bold">Cuentas Bancarias</span>
            <div className="flex justify-between">
                <AccountTable
                    loading={loading}
                    accounts={accounts}
                    handleDelete={() => deleteAccount(operatorId)}
                    handleEdit={(account) => {
                        setAccount(account);
                        setIsModalOpen(true);
                        setIsUpdate(true);
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
                    addBankAccount(account);
                }}
                isDefault={accounts?.length === 0}
            />
        </div>
    );
}

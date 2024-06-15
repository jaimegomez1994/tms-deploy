import { regexLettersNumbersSpaces } from '../../../utils/Regex';

export default function CompanyMainInfo(props) {
    const inputRegex = regexLettersNumbersSpaces;
    const { company, setCompany } = props;
    return (
        <>
            {' '}
            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Nombre:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="nombre"
                    placeholder="Nombre de la empresa"
                    value={company?.nombre}
                    onChange={(e) => {
                        if (inputRegex.test(e.target.value)) {
                            setCompany((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }
                    }}
                />
            </div>
            <div className="mt-2 sm:pl-[18px] flex flex-col">
                <span>Alias:</span>
                <input
                    className="bg-white p-2 border-2"
                    name="alias"
                    placeholder="Alias de la  empresa"
                    value={company?.alias}
                    onChange={(e) => {
                        if (inputRegex.test(e.target.value)) {
                            setCompany((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }
                    }}
                />
            </div>
            <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                <span>RFC: </span>
                <input
                    className="bg-white p-2 border-2"
                    name="rfc"
                    placeholder="RFC de la empresa"
                    value={company?.rfc}
                    onChange={(e) => {
                        const reg = /^[a-zA-Z0-9]*$/;
                        if (reg.test(e.target.value)) {
                            setCompany((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }
                    }}
                />
            </div>
        </>
    );
}

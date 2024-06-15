import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search(props) {
    const { searchBy, setSearchBy, labelPlaceHolder } = props;
    return (
        <div className="w-12/12 flex justify-end py-6 ">
            <div className="bg-slate-200 rounded p-2 flex">
                <MagnifyingGlassIcon className="h-6 w-6 "></MagnifyingGlassIcon>
                <input
                    className="bg-slate-200 pl-4 focus:outline-none"
                    name="searchByName"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    placeholder={`Buscar ${labelPlaceHolder}`}
                ></input>
            </div>
        </div>
    );
}

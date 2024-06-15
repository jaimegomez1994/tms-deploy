import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ClientSearch(props) {
    const { searchByName, setSearchByName } = props;
    return (
        <div className="w-10/12 flex justify-end py-6 ">
            <div className="bg-slate-200 rounded p-2 flex">
                <MagnifyingGlassIcon className="h-6 w-6 "></MagnifyingGlassIcon>
                <input
                    className="bg-slate-200 pl-4 focus:outline-none"
                    name="searchByName"
                    value={searchByName}
                    onChange={(e) => setSearchByName(e.target.value)}
                    placeholder="Buscar por nombre"
                ></input>
            </div>
        </div>
    );
}

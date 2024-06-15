export default function CountryFilterOption(props) {
    const { filterValue, setFilterValue, listOfItems } = props;
    return (
        <div className="p-5">
            <div>Pais:</div>
            <select
                id="countrySelect"
                className="bg-white p-3 border-2"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
            >
                <option value="">Selecciona un pais</option>
                {listOfItems?.map((item) => (
                    <option key={item.id} value={item.nombre}>
                        {item.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
}

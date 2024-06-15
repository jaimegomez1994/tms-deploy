export default function ProductFilterOption(props) {
    const { filterValue, setFilterValue, listOfItems } = props;
    return (
        <div className="p-5">
            <div>Tipo de Producto:</div>
            <select
                id="productTypeSelect"
                className="bg-white p-3 border-2"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
            >
                <option value="">Selecciona un tipo de producto</option>
                {listOfItems?.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}

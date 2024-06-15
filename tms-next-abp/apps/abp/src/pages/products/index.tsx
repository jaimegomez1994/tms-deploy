import { useEffect, useState } from 'react';

import { ProductService } from '@tms_next_abp/proxy';
import ProductsTable from '../../components/products/ProductsTable';
import ProductFilterOption from '../../components/products/ProductFilterOption';
import Filter from '../../components/shared/Filter';
import ProductModal from '../../components/products/ProductModal';

type Product = {
    id: string;
    name?: string;
    clave?: string;
    tipoDeProducto?: number | null;
    precioUnitario?: number | null;
    moneda?: number | null;
    tipoDeUnidad?: number | null;
    peligroso?: number | null;
    normaAplicable?: string | null;
};

export default function Products() {
    const [mounted, setMounted] = useState(false);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterProductType, setFilterProductType] = useState('');
    const [error, setError] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [product, setProduct] = useState<Product>();

    const productTypes = Array.from(
        new Set(products.map((item) => item.tipoProducto))
    );

    const filteredProducts = filterProductType
        ? products?.filter(
              (product) => product.tipoProducto === filterProductType
          )
        : products;

    function getProducts() {
        setLoading(true);
        ProductService.productsGetList()
            .then((data) => {
                setProducts(data.items);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const buildProductBody = (product) => {
        const {
            nombre,
            clave,
            tipoProducto,
            precioUnitario,
            moneda,
            tipoDeUnidad,
            peligroso,
            normaAplicable
        } = product;

        return {
            nombre: nombre,
            clave: clave,
            tipoProducto: tipoProducto,
            precioUnitario: precioUnitario,
            moneda: moneda,
            tipoDeUnidad: tipoDeUnidad,
            peligroso: peligroso,
            normaAplicable: normaAplicable
        };
    };

    function addProducts(product) {
        const productBody = buildProductBody(product);

        ProductService.addProduct(productBody)
            .then(() => {
                getProducts();
                setIsModalOpen(false);
                setProduct(undefined);
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    function updateProduct(product) {
        ProductService.updateProduct(
            product.id,
            product.nombre,
            product.clave,
            product.tipoProducto,
            product.precioUnitario,
            product.moneda,
            product.tipoDeUnidad,
            product.peligroso,
            product.normaAplicable
        )
            .then(() => {
                getProducts();
                setIsModalOpen(false);
                setProduct(undefined);
            })
            .catch((error) => {
                let parsedError = JSON.parse(JSON.stringify(error));
                parsedError = parsedError?.body?.error?.data;

                let key = Object.keys(parsedError)[0];
                let value = parsedError[key];

                let resultError = `${key}: '${value}'`;

                setError(resultError || 'Error');
            });
    }

    function deleteProduct(id) {
        ProductService.deleteProduct(id).then(() =>
            setProducts((prev) => prev.filter((product) => product.id !== id))
        );
    }

    useEffect(() => {
        setMounted(true);
        getProducts();
    }, []);

    return (
        <>
            {mounted && (
                <>
                    <Filter
                        listOfItems={productTypes}
                        handleFilter={(country: string) =>
                            setFilterProductType(country)
                        }
                        FilterOptionComponent={ProductFilterOption}
                    />
                    <div className="overflow-auto max-h-[60%] mb-8">
                        <ProductsTable
                            loading={loading}
                            products={filteredProducts}
                            deleteProduct={deleteProduct}
                            setIsModalOpen={setIsModalOpen}
                            setProduct={setProduct}
                            setIsUpdate={setIsUpdate}
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sky-500 text-white p-3 rounded"
                    >
                        Agregar Producto
                    </button>
                    <ProductModal
                        isModalOpen={isModalOpen}
                        onCloseModal={() => {
                            setIsModalOpen(false);
                            setIsUpdate(false);
                            setError('');
                        }}
                        product={product}
                        handleSave={() => {
                            if (isUpdate) {
                                updateProduct(product);
                            } else {
                                addProducts(product);
                            }
                        }}
                        error={error}
                        setProduct={setProduct}
                        isUpdate={isUpdate}
                    />
                </>
            )}
        </>
    );
}

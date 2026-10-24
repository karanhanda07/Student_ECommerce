
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load products when the page opens
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');

                if (!response.ok) {
                    throw new Error('Could not load products.');
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Find products matching the search text
    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase())
    );

    // Show only 10 products on each page
    const productsPerPage = 10;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const visibleProducts = filteredProducts.slice(
        (page - 1) * productsPerPage,
        page * productsPerPage
    );

    return (
        <div className="min-h-screen px-5 py-12 text-slate-800 md:px-10">
            <div className="mx-auto max-w-6xl">

                {/* Back to Admin Dashboard */}
                <Link
                    to="/admin"
                    className="font-semibold text-blue-600 hover:text-blue-800"
                >
                    ← Back to Dashboard
                </Link>

                {/* Page heading */}
                <div className="mt-8 mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-900">
                        Manage <span className="text-blue-600">Products</span>
                    </h1>

                    <p className="mt-3 text-slate-500">
                        View all marketplace products.
                    </p>
                </div>

                <div className="rounded-3xl border border-white bg-white/90 p-6 shadow-xl">

                    {/* Search and product count */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search products..."
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 md:w-80"
                        />

                        <span className="font-semibold text-slate-600">
                            {filteredProducts.length} Products
                        </span>
                    </div>

                    {/* Loading or error messages */}
                    {loading && <p>Loading products...</p>}

                    {error && (
                        <p className="text-red-600">{error}</p>
                    )}

                    {/* Product list */}
                    {!loading && !error && (
                        <div className="space-y-3">
                            {visibleProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                >
                                    {/* Small product image */}
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-16 w-16 shrink-0 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-xs text-slate-500">
                                            No image
                                        </div>
                                    )}

                                    {/* Product information */}
                                    <div className="min-w-0 flex-1">
                                        <h2 className="font-bold text-slate-900">
                                            {product.name}
                                        </h2>

                                        <p className="text-sm text-slate-600">
                                            ${product.price}
                                        </p>

                                        <p className="mt-1 break-words text-sm text-slate-500">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Open product details */}
                                    <Link
                                        to={`/item/${product._id}?from=admin`}
                                        className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                                    >
                                        View
                                    </Link>
                                </div>
                            ))}

                            {filteredProducts.length === 0 && (
                                <p className="py-8 text-center text-slate-500">
                                    No products found.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && !error && totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="rounded-xl bg-slate-100 px-4 py-2 font-semibold disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <span className="text-sm font-semibold">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                                className="rounded-xl bg-slate-100 px-4 py-2 font-semibold disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;

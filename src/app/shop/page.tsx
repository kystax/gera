import ProductCatalog from "@/components/ProductCatalog";

export default function ShopPage() {
    return (
        <main className="min-h-screen pt-10">
            <div className="max-w-7xl mx-auto px-4 py-16 text-center border-b border-gray-100 mb-10">
                <h1 className="text-6xl font-display mb-4">THE SHOP</h1>
                <p className="text-gray-400 uppercase tracking-[0.4em] text-xs">Curated essential pieces for your wardrobe</p>
            </div>

            <ProductCatalog title="EXPLORE ALL PRODUCTS" />

            {/* Newsletter Section */}
            <section className="bg-brand-paper py-32 px-4 text-center">
                <div className="max-w-2xl mx-auto space-y-10">
                    <h2 className="text-4xl font-display leading-[1.2]">
                        JOIN THE CIRCLE FOR EXCLUSIVE<br />NEW COLLECTIONS
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow bg-white border border-gray-200 px-6 py-4 text-xs tracking-widest outline-none focus:border-brand-charcoal"
                        />
                        <button className="bg-brand-charcoal text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

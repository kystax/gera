import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { products } from '@/data/products';

export async function GET() {
    try {
        await dbConnect();

        // Clear existing products to avoid duplicates during testing
        await Product.deleteMany({});

        // Prepare products for insertion
        const productsToInsert = products.map(p => ({
            pid: p.id,
            name: p.name,
            price: p.price,
            category: p.category,
            image: p.image,
            desc: p.desc,
            featured: Math.random() > 0.8 // Randomly feature some items
        }));

        await Product.insertMany(productsToInsert);

        return NextResponse.json({
            success: true,
            message: `${productsToInsert.length} products migrated successfully.`
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

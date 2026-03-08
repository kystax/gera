import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const limit = searchParams.get('limit');

        let query: any = {};
        if (category) query.category = category;
        if (featured === 'true') query.featured = true;

        let productsQuery = Product.find(query).sort({ createdAt: -1 });

        if (limit) {
            productsQuery = productsQuery.limit(parseInt(limit));
        }

        const products = await productsQuery;

        return NextResponse.json({ success: true, data: products });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const product = await Product.create(body);

        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        // We try to find by original pid or by MongoDB _id
        const product = await Product.findOne({
            $or: [
                { pid: params.id },
                { _id: params.id.match(/^[0-9a-fA-F]{24}$/) ? params.id : null }
            ].filter(cond => cond.pid || cond._id)
        });

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: product });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

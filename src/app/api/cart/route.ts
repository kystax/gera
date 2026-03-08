import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/Cart";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    try {
        const cart = await Cart.findOne({ userId: session.user.id });
        return NextResponse.json(cart?.items || []);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, name, price, image, quantity } = await req.json();

    await dbConnect();

    try {
        let cart = await Cart.findOne({ userId: session.user.id });

        if (!cart) {
            cart = new Cart({
                userId: session.user.id,
                items: [{ productId, name, price, image, quantity }],
            });
        } else {
            const existingItemIndex = cart.items.findIndex(
                (item: any) => item.productId === productId
            );

            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, name, price, image, quantity });
            }
        }

        await cart.save();
        return NextResponse.json(cart.items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await req.json().catch(() => ({}));
    const { productId } = db;

    await dbConnect();

    try {
        const cart = await Cart.findOne({ userId: session.user.id });
        if (cart) {
            if (productId) {
                cart.items = cart.items.filter((item: any) => item.productId !== productId);
            } else {
                cart.items = []; // Clear entire cart
            }
            await cart.save();
        }
        return NextResponse.json(cart?.items || []);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    try {
        const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });
        return NextResponse.json(orders);
    } catch (error) {
        console.error("Orders fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, total, shippingAddress } = await req.json();

    await dbConnect();

    try {
        const order = new Order({
            userId: session.user.id,
            items: items.map((i: any) => ({
                ...i,
                productId: i.id // Ensure we store productId properly
            })),
            total,
            shippingAddress,
            status: "processing"
        });

        await order.save();

        // Optionally clear the cart after order is placed
        // This is usually done on the checkout side
        return NextResponse.json(order);
    } catch (error) {
        console.error("Order create error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}

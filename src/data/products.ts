export type Product = {
    id: number;
    name: string;
    price: string;
    category: 'bridal' | 'dresses' | 'pants' | 'tops' | 'skirts';
    image: string;
    desc: string;
};

export const products: Product[] = [
    // Bridal (Id: 1xx)
    ...Array.from({ length: 7 }, (_, i) => ({
        id: 101 + i,
        name: `ELITE BRIDAL ${i + 1}`,
        price: `$${(1200 + i * 150).toLocaleString()}.00`,
        category: "bridal" as const,
        image: `/assets/bridal/${String(i + 1).padStart(3, '0')}.jpg`,
        desc: "A stunning piece from our handcrafted bridal collection, designed for timeless elegance."
    })),
    // Dresses (Id: 2xx)
    ...Array.from({ length: 14 }, (_, i) => ({
        id: 201 + i,
        name: `SILK DRESS ${i + 1}`,
        price: `$${(280 + i * 25).toLocaleString()}.00`,
        category: "dresses" as const,
        image: `/assets/dresses/${String(i + 1).padStart(3, '0')}.jpg`,
        desc: "Fluid silhouettes and premium silk fabrics define this piece from our signature dress collection."
    })),
    // Tops (Id: 3xx)
    ...Array.from({ length: 2 }, (_, i) => ({
        id: 301 + i,
        name: `PREMIUM TOP ${i + 1}`,
        price: `$${(145 + i * 40).toLocaleString()}.00`,
        category: "tops" as const,
        image: `/assets/tops/${String(i + 1).padStart(3, '0')}.jpg`,
        desc: "Versatile and refined, this top is crafted from the finest materials for a perfect fit."
    })),
    // Skirts (Id: 4xx)
    ...Array.from({ length: 7 }, (_, i) => ({
        id: 401 + i,
        name: `DESIGNER SKIRT ${i + 1}`,
        price: `$${(110 + i * 20).toLocaleString()}.00`,
        category: "skirts" as const,
        image: `/assets/skirts/${String(i + 1).padStart(3, '0')}.jpg`,
        desc: "Editorial-inspired design with a focus on fluid movement and modern texture."
    })),
    // Pants (Id: 5xx)
    ...Array.from({ length: 11 }, (_, i) => ({
        id: 501 + i,
        name: `TAILORED PANTS ${i + i + 1}`,
        price: `$${(160 + i * 15).toLocaleString()}.00`,
        category: "pants" as const,
        image: `/assets/pants/${String(i + 1).padStart(3, '0')}.jpg`,
        desc: "Perfectly tailored trousers designed for both comfort and professional elegance."
    }))
];

import AboutSection from "@/components/AboutSection";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/003.jpg"
                    alt="About Hero"
                    fill
                    className="object-cover brightness-50"
                />
                <div className="relative z-10 text-center text-white space-y-4">
                    <h1 className="text-7xl font-display tracking-widest">ABOUT US</h1>
                    <p className="uppercase tracking-[0.6em] text-xs font-light">Crafting the future of elegance</p>
                </div>
            </div>

            <AboutSection />

            {/* Philosophy Section */}
            <section className="bg-white py-32 px-4">
                <div className="max-w-4xl mx-auto space-y-20 text-center">
                    <div className="space-y-6">
                        <h3 className="text-brand-accent text-xs uppercase tracking-[0.4em] font-bold">Our Philosophy</h3>
                        <p className="text-3xl font-display leading-[1.4]">
                            "WE BELIEVE THAT TRUE STYLE IS BORN FROM THE HARMONY OF SIMPLICITY AND QUALITY.
                            AT GERA, EVERY STITCH TELLS A STORY OF MINDFUL CRAFTSMANSHIP."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-gray-100">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest">Timeless Design</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">Pieces that transcend seasons and trends, made to be cherished for life.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest">Premium Quality</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">Sourcing the finest fabrics and materials from ethical suppliers globally.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest">Sustainability</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">Mindful production processes that respect both our planet and our makers.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

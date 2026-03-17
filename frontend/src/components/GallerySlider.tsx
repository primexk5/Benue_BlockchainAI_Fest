import Reveal from './Reveal';

const images = Array.from({ length: 27 }, (_, i) => `/${i + 1}.jpg`);

const Row1 = [...images.slice(0, 14), ...images.slice(0, 14)];
const Row2 = [...images.slice(14), ...images.slice(14)];

export default function GallerySlider() {
    return (
        <section className="bg-secondary py-20 overflow-hidden relative">
            <div className="container mx-auto px-4 mb-16">
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">Capturing Moments</span>
                        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                            Event Memories
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                            Take a look at some of the best moments from our previous editions.
                            Innovation, building, and community.
                        </p>
                    </div>
                </Reveal>
            </div>

            <div className="flex flex-col gap-8 md:gap-12 relative">
                {/* Gradient Overlays for smooth edges */}
                <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-linear-to-r from-secondary/50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-linear-to-l from-secondary/50 to-transparent z-10 pointer-events-none" />

                {/* First Row */}
                <div className="flex w-fit animate-marquee pause-on-hover gap-6 md:gap-8 px-4">
                    {Row1.map((src, i) => (
                        <div
                            key={`row1-${i}`}
                            className="w-64 md:w-80 lg:w-96 aspect-4/3 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.05] group shrink-0 bg-gray-800"
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0  group-hover:bg-black/0 transition-colors duration-500" />
                        </div>
                    ))}
                </div>

                {/* Second Row */}
                <div className="flex w-fit animate-marquee-reverse pause-on-hover gap-6 md:gap-8 px-4">
                    {Row2.map((src, i) => (
                        <div
                            key={`row2-${i}`}
                            className="w-64 md:w-80 lg:w-96 aspect-4/3 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.05] group shrink-0 bg-gray-800"
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${i + 15}`}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0  group-hover:bg-black/0 transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

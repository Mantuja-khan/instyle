import { Gem, Headphones, Leaf, Wallet } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: Leaf,
    title: "Sustainable Fabrics",
    text: "Thoughtful choices for a better tomorrow.",
  },
  {
    icon: Gem,
    title: "Premium Quality",
    text: "Crafted with care, made to last.",
  },
  {
    icon: Wallet,
    title: "Secure Payments",
    text: "Safe, simple & hassle-free.",
  },
  {
    icon: Headphones,
    title: "Customer Care",
    text: "We're here for you, always.",
  },
];

export function Features() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:py-16">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 110}>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-border text-foreground/70">
                <f.icon size={20} strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[12px] font-bold tracking-label text-foreground uppercase">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

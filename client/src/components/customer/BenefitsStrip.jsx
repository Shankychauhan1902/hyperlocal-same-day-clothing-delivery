import { MapPin, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Shops around the corner",
    text: "Every piece comes from a real local store.",
  },
  {
    icon: Truck,
    title: "At your door, today",
    text: "Fast delivery from nearby, not a warehouse.",
  },
  {
    icon: ShieldCheck,
    title: "Know what you're buying",
    text: "True-to-life photos and clear size details.",
  },
];

export default function BenefitsStrip() {
  return (
    <section className="benefits" id="how">
      {benefits.map(({ icon: Icon, title, text }) => (
        <div key={title}>
          <span className="benefit-icon">
            <Icon size={18} />
          </span>
          <p>
            <b>{title}</b>
            <small>{text}</small>
          </p>
        </div>
      ))}
    </section>
  );
}

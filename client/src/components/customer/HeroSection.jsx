import { ArrowRight, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { imageUrl } from '../../utils/format.js';

export default function HeroSection({ pincode, onPincodeChange, onCheckZone, service }) {
  return <section className="hero">
    <div className="hero-copy">
      <p className="eyebrow"><span className="eyebrow-dot" /> GOOD STYLE, RIGHT AROUND YOU</p>
      <h1>Find it nearby.<br /><em>Wear it today.</em></h1>
      <p className="hero-text">Thoughtful pieces from independent shops in your neighbourhood, delivered the same day.</p>
      <form className="zone-form" onSubmit={onCheckZone}>
        <MapPin size={18} />
        <input value={pincode} onChange={event => onPincodeChange(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" placeholder="Enter your pincode" aria-label="Pincode" />
        <button type="submit">Check area <ArrowRight size={16} /></button>
      </form>
      {service && <p className="service-note">{service}</p>}
      <div className="hero-trust"><span><Clock3 size={15} /> Same-day delivery</span><span><ShieldCheck size={15} /> Real local shops</span></div>
    </div>
    <div className="hero-photo">
      <img src={imageUrl('photo-1483985988355-763728e1935b')} alt="Friends browsing a local fashion store" />
      <div className="photo-badge"><span className="badge-pulse" /><div><b>Good finds, close by</b><small>From shops in your area</small></div></div>
      <div className="photo-caption">THE NEIGHBOURHOOD EDIT <span>01 / 04</span></div>
    </div>
    <div className="hero-index">01 <span /> 04</div>
  </section>;
}

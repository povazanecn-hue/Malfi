import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ReservationCTA() {
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Reservation?guests=${guests}&date=${date}`);
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-rosso-pale" style={{ borderTop: '1px solid rgba(192,57,43,0.1)', borderBottom: '1px solid rgba(192,57,43,0.1)' }}>
      <div className="container-malfi text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="label-caps text-rosso mb-3">Rezervácia stola</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-dark mb-3">
            Zarezervujte si stôl
          </h2>
          <p className="text-text-medium text-sm md:text-base mb-8 md:mb-10">
            Ideálne miesto pre romantické večere, firemné obedy aj rodinné oslavy.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <select
              value={guests}
              onChange={e => setGuests(e.target.value)}
              className="bg-white border border-olive/20 text-text-dark rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-olive min-h-[48px]"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'hosť' : n < 5 ? 'hostia' : 'hostí'}</option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="bg-white border border-olive/20 text-text-dark rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-olive min-h-[48px]"
            />
            <button type="submit" className="btn-primary px-8 py-3 font-semibold min-h-[48px]">
              Pokračovať
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
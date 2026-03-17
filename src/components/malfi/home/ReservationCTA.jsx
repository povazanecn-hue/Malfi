import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ReservationCTA() {
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/MalfiReservation?guests=${guests}&date=${date}`);
  };

  return (
    <section className="section-pad" style={{
      background: 'linear-gradient(135deg, rgba(194,149,107,0.12) 0%, rgba(107,124,94,0.08) 100%)',
      borderTop: '1px solid rgba(194,149,107,0.15)',
      borderBottom: '1px solid rgba(194,149,107,0.15)',
    }}>
      <div className="container-malfi text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="label-caps text-gold mb-4">Rezervácia stola</div>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
            Zarezervujte si stôl
          </h2>
          <p className="text-text-muted mb-10">
            Ideálne miesto pre romantické večere, firemné obedy aj rodinné oslavy.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <select
              value={guests}
              onChange={e => setGuests(e.target.value)}
              className="bg-bg-secondary border border-[rgba(194,149,107,0.3)] text-text-primary rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-gold"
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
              className="bg-bg-secondary border border-[rgba(194,149,107,0.3)] text-text-primary rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-gold"
            />
            <button type="submit" className="btn-gold px-8 py-3 font-semibold">
              Pokračovať
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Users, Check, Loader2 } from 'lucide-react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
  '20:00', '20:30', '21:00', '21:30'
];

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

const OCCASIONS = [
  { value: 'none', label: 'Žiadna príležitosť' },
  { value: 'birthday', label: 'Narodeniny' },
  { value: 'anniversary', label: 'Výročie' },
  { value: 'business', label: 'Pracovný obed' },
  { value: 'date', label: 'Rande' },
  { value: 'other', label: 'Iné' },
];

export default function Reservations() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  
  const [formData, setFormData] = useState({
    date: null,
    time: '',
    party_size: 2,
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    occasion: 'none',
    special_requests: ''
  });

  const { data: existingReservations = [] } = useQuery({
    queryKey: ['reservations', formData.date ? format(formData.date, 'yyyy-MM-dd') : null],
    queryFn: () => formData.date 
      ? base44.entities.Reservation.filter({ 
          date: format(formData.date, 'yyyy-MM-dd'),
          status: 'confirmed'
        })
      : [],
    enabled: !!formData.date,
  });

  const { data: tables = [] } = useQuery({
    queryKey: ['tables'],
    queryFn: () => base44.entities.Table.filter({ is_active: true }),
  });

  const generateReservationNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 4).toUpperCase();
    return `R-${timestamp}${random}`;
  };

  const getAvailableSlots = () => {
    if (!formData.date) return TIME_SLOTS;
    
    // Calculate available capacity per time slot
    const slotCapacity = {};
    TIME_SLOTS.forEach(slot => {
      const totalCapacity = tables.reduce((sum, t) => sum + t.capacity, 0);
      const bookedCapacity = existingReservations
        .filter(r => r.time === slot)
        .reduce((sum, r) => sum + r.party_size, 0);
      slotCapacity[slot] = totalCapacity - bookedCapacity;
    });

    return TIME_SLOTS.filter(slot => slotCapacity[slot] >= formData.party_size);
  };

  const createReservationMutation = useMutation({
    mutationFn: async (data) => {
      return base44.entities.Reservation.create(data);
    },
    onSuccess: (reservation) => {
      setConfirmedReservation(reservation);
      setStep(3);
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error('Nepodarilo sa vytvoriť rezerváciu. Skúste to znova.');
      setIsSubmitting(false);
    }
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const reservationData = {
      reservation_number: generateReservationNumber(),
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      party_size: formData.party_size,
      date: format(formData.date, 'yyyy-MM-dd'),
      time: formData.time,
      duration_minutes: 90,
      status: 'confirmed',
      occasion: formData.occasion,
      special_requests: formData.special_requests || null
    };

    createReservationMutation.mutate(reservationData);
  };

  const availableSlots = getAvailableSlots();

  // Step 1: Date, Time, Party Size
  if (step === 1) {
    return (
      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-6xl font-bold mb-4"
            >
              Rezervujte si stôl
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/80"
            >
              Pridajte sa k nám pre nezabudnuteľný gastronomický zážitok
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <Card className="p-8">
              <h2 className="font-display text-2xl font-bold mb-6">Vyberte dátum a čas</h2>
              
              <div className="space-y-6">
                {/* Party Size */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4" />
                    Počet hostí
                  </Label>
                  <Select 
                    value={formData.party_size.toString()} 
                    onValueChange={(v) => setFormData(prev => ({ ...prev, party_size: parseInt(v), time: '' }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PARTY_SIZES.map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size} {size === 1 ? 'hosť' : 'hostia'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pre skupiny väčšie ako 8 osôb nás prosím kontaktujte telefonicky.
                  </p>
                </div>

                {/* Date */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="h-4 w-4" />
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'EEEE, MMMM d, yyyy') : 'Vyberte dátum'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData(prev => ({ ...prev, date, time: '' }))}
                        disabled={(date) => isBefore(date, startOfDay(new Date())) || isBefore(addDays(new Date(), 60), date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time */}
                {formData.date && (
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      Time
                    </Label>
                    {availableSlots.length === 0 ? (
                      <div className="text-center py-8 bg-muted/50 rounded-xl">
                        <p className="text-muted-foreground">
                          Pre váš počet hostí nie sú dostupné žiadne časy v tento deň.
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Skúste iný dátum alebo počet hostí.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                            className={cn(
                              "py-3 px-2 rounded-lg text-sm font-medium transition-all",
                              formData.time === slot
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Button 
                className="w-full h-12 mt-8 rounded-xl"
                disabled={!formData.date || !formData.time}
                onClick={() => setStep(2)}
              >
                Pokračovať
              </Button>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  // Step 2: Contact Details
  if (step === 2) {
    return (
      <div className="min-h-screen pt-20 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <button 
            onClick={() => setStep(1)}
            className="text-muted-foreground hover:text-foreground mb-6"
          >
            ← Back
          </button>

          <Card className="p-8">
            <h2 className="font-display text-2xl font-bold mb-2">Vaše údaje</h2>
            <p className="text-muted-foreground mb-6">
              {format(formData.date, 'EEEE, MMMM d')} at {formData.time} · {formData.party_size} guests
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="customer_name">Meno a priezvisko *</Label>
                <Input
                  id="customer_name"
                  value={formData.customer_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                  placeholder="John Doe"
                  className="mt-1 h-12"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer_email">Email *</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, customer_email: e.target.value }))}
                    placeholder="john@example.com"
                    className="mt-1 h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="customer_phone">Telefón *</Label>
                  <Input
                    id="customer_phone"
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, customer_phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                    className="mt-1 h-12"
                  />
                </div>
              </div>

              <div>
                <Label>Príležitosť</Label>
                <Select 
                  value={formData.occasion} 
                  onValueChange={(v) => setFormData(prev => ({ ...prev, occasion: v }))}
                >
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASIONS.map((occ) => (
                      <SelectItem key={occ.value} value={occ.value}>
                        {occ.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="special_requests">Špeciálne požiadavky</Label>
                <Textarea
                  id="special_requests"
                  value={formData.special_requests}
                  onChange={(e) => setFormData(prev => ({ ...prev, special_requests: e.target.value }))}
                  placeholder="Alergie, preferencie sedenia, špeciálne príležitosti..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            <Button 
              className="w-full h-12 mt-8 rounded-xl"
              disabled={!formData.customer_name || !formData.customer_email || !formData.customer_phone || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Potvrdzujem...
                </>
              ) : (
                'Potvrdiť rezerváciu'
              )}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Step 3: Confirmation
  return (
    <div className="min-h-screen pt-20 bg-muted/30 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="h-10 w-10 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-4xl font-bold mb-4">Rezervácia potvrdená!</h1>
          <p className="text-muted-foreground mb-8">
            Potvrdenie sme zaslali na {formData.customer_email}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 text-left mb-8">
            <div className="text-center mb-6 pb-4 border-b">
              <p className="text-sm text-muted-foreground">Číslo rezervácie</p>
              <p className="text-2xl font-bold font-mono">{confirmedReservation?.reservation_number}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{format(formData.date, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Party Size</span>
                <span className="font-medium">{formData.party_size} guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{formData.customer_name}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <Button asChild className="rounded-full px-8">
          <a href="/Home">Back to Home</a>
        </Button>
      </div>
    </div>
  );
}
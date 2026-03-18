import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Pizza, Heart, Coffee, Leaf, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm tracking-[0.3em] uppercase mb-4 text-white/80"
          >
            Náš príbeh
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold mb-4"
          >
            Il cuore italiano
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Kúsok Talianska v srdci Bratislavy — kde ľudia prídu nielen na jedlo, ale aj po atmosféru.
          </motion.p>
        </div>
      </section>

      {/* Osobný príbeh */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3">Osobný príbeh</p>
              <h2 className="font-display text-4xl font-bold mb-6">
                Vieroslava Kozáčiková
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Talianska kuchyňa je už mnoho rokov mojou záľubou a súčasťou môjho života. 
                  Žila som dvadsať rokov s Talianom, spolu sme viedli aj taliansku reštauráciu 
                  <strong className="text-foreground"> Brunos</strong> na Suchom mýte. Naučila som sa nielen talianske 
                  chute, ale aj to, ako vytvoriť pravú atmosféru pohody a dobrého jedla.
                </p>
                <p>
                  Počas posledných troch letných sezón som pri jazere vo Veľkom Bieli prevádzkovala 
                  malý stánok, kde som ľuďom ponúkala <strong className="text-foreground">špeciálnu Pinsu Romana</strong> — 
                  tradičnú rímsku kváskovanú pizzu z kombinácie štyroch druhov múk, odľahčenú 
                  a chrumkavú, ozdobenú čerstvými a kvalitnými ingredienciami.
                </p>
                <p>
                  Ohlasy ľudí boli výborné, mnohí sa ma pýtali, kde ma môžu nájsť aj počas roka. 
                  To ma inšpirovalo priviesť tento koncept do stálej, celoročnej prevádzky.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
                alt="Pinsa Romana"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zámer a koncept */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Talianske bistro"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3">Zámer a koncept</p>
              <h2 className="font-display text-4xl font-bold mb-6">
                Útulné talianske bistro
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Mojím cieľom je vytvoriť <strong className="text-foreground">útulné talianske bistro</strong>, 
                  kde budú hostia cítiť chuť a atmosféru Talianska.
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { icon: Pizza, text: 'Pinsa Romana — rýchla, chutná a originálna alternatíva klasickej pizze' },
                  { icon: Leaf, text: 'Pasta, antipasti a ďalšie talianske jedlá vhodné pre bistro' },
                  { icon: Heart, text: 'Domáce tiramisu a "dolce" podľa sezóny' },
                  { icon: Coffee, text: 'Talianska káva, prosecco, talianske vína, osviežujúce drinky' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Priestor a vízia */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3">Priestor & Vízia</p>
            <h2 className="font-display text-4xl font-bold mb-4">Prečo MALFI?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Verím, že projekt má potenciál — talianska kuchyňa je obľúbená a nadčasová, 
              Pinsa je stále novinka na trhu a láka ako niečo špeciálne.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Star, 
                title: 'Overená kvalita', 
                desc: 'Pozitívne skúsenosti a skvelá spätná väzba od zákazníkov z troch sezón pri jazere.' 
              },
              { 
                icon: Users, 
                title: 'Celoročná prevádzka', 
                desc: 'Bistro bude otvorené počas celého roka — v lete ľahké jedlá a drinky, v zime útulné prostredie a teplé jedlá.' 
              },
              { 
                icon: Heart, 
                title: 'Kúsok Talianska', 
                desc: 'Miesto, kde ľudia prídu nielen na jedlo, ale aj po atmosféru — autentický taliansky šarm v našom meste.' 
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Príďte zažiť MALFI</h2>
          <p className="text-muted-foreground text-lg mb-10">
            Či už ide o špeciálnu oslavu alebo pokojný večer vonku,
            radi vás privítame pri našom stole.
          </p>
          <Link to="/MalfiReservation">
            <Button size="lg" className="rounded-full px-8">
              Rezervovať stôl
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
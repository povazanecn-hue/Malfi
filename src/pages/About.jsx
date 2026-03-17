import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Award, Heart, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&q=80)',
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
            Our Story
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold mb-4"
          >
            About La Maison
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-xl mx-auto"
          >
            A passion for food. A commitment to excellence. A place to call home.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold mb-6">
                Where Every Dish Tells a Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2004 by Chef Antoine Laurent, La Maison was born from a 
                  simple dream: to create a dining experience that feels like coming home — 
                  to a home with a world-class kitchen.
                </p>
                <p>
                  Our menu is a celebration of seasonal ingredients sourced from local farms 
                  and artisan producers. Every dish is crafted with meticulous attention to 
                  detail, blending classic French techniques with contemporary innovation.
                </p>
                <p>
                  Over the years, La Maison has become more than a restaurant — it's a 
                  gathering place where memories are made, celebrations unfold, and the 
                  art of fine dining comes alive.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80"
                alt="Restaurant interior"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Leaf, 
                title: 'Farm to Table', 
                desc: 'We partner with local farmers and artisans to bring the freshest seasonal ingredients to your plate.' 
              },
              { 
                icon: Award, 
                title: 'Culinary Excellence', 
                desc: 'Our team of talented chefs brings decades of combined experience and an unwavering commitment to quality.' 
              },
              { 
                icon: Heart, 
                title: 'Warm Hospitality', 
                desc: 'From the moment you walk in, our team creates an atmosphere of genuine warmth and impeccable service.' 
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Come Experience La Maison</h2>
          <p className="text-muted-foreground text-lg mb-10">
            Whether it's a special celebration or a casual evening out, 
            we'd love to welcome you to our table.
          </p>
          <Link to="/Reservations">
            <Button size="lg" className="rounded-full px-8">
              Make a Reservation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
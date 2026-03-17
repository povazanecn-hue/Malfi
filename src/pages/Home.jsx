import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Utensils, Calendar, Clock, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import MenuItemCard from '@/components/menu/MenuItemCard';

export default function Home() {
  const { data: featuredItems = [] } = useQuery({
    queryKey: ['featured-items'],
    queryFn: () => base44.entities.MenuItem.filter({ is_featured: true, is_available: true }, '-created_date', 4),
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase mb-6 text-white/80"
          >
            Fine Dining Experience
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            La Maison
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Where culinary artistry meets warm hospitality. 
            Experience unforgettable flavors crafted with passion.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/Reservations">
              <Button size="lg" className="rounded-full px-8 h-14 text-base">
                <Calendar className="mr-2 h-5 w-5" />
                Reserve a Table
              </Button>
            </Link>
            <Link to="/Order">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Utensils className="mr-2 h-5 w-5" />
                Order Online
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Utensils, 
                title: 'Exquisite Cuisine', 
                desc: 'Locally sourced ingredients transformed into culinary masterpieces' 
              },
              { 
                icon: Clock, 
                title: 'Quick Delivery', 
                desc: 'Fresh dishes delivered to your door within 30-45 minutes' 
              },
              { 
                icon: Calendar, 
                title: 'Easy Reservations', 
                desc: 'Book your table online in seconds for a seamless experience' 
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      {featuredItems.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3">From Our Kitchen</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Featured Dishes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <MenuItemCard item={item} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/Menu">
                <Button variant="outline" size="lg" className="rounded-full">
                  View Full Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Teaser */}
      <section className="py-20 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3">Our Story</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                A Legacy of Culinary Excellence
              </h2>
              <p className="text-background/70 text-lg leading-relaxed mb-6">
                For over two decades, La Maison has been the heartbeat of fine dining 
                in our community. Our chef-driven menu celebrates seasonal ingredients, 
                classic techniques, and innovative flavors that tell a story with every bite.
              </p>
              <Link to="/About">
                <Button variant="outline" className="rounded-full border-background/30 text-background hover:bg-background/10">
                  Learn Our Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80"
                alt="Chef at work"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-sm text-primary-foreground/80">500+ Reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Whether you join us in person or enjoy our cuisine at home, 
            we can't wait to serve you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Reservations">
              <Button size="lg" className="rounded-full px-8 h-14 text-base">
                Make a Reservation
              </Button>
            </Link>
            <Link to="/Order">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base">
                Order for Pickup/Delivery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3">Visit Us</p>
              <h2 className="font-display text-4xl font-bold mb-6">Find Us Here</h2>
              <div className="space-y-4 text-lg">
                <p className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <span>123 Gourmet Avenue<br />New York, NY 10001</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary shrink-0" />
                  <span>Mon-Sat: 5PM-11PM | Sun: 4PM-9PM</span>
                </p>
              </div>
              <Link to="/Contact">
                <Button className="mt-8 rounded-full">
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-secondary">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
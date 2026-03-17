import HeroSection from '@/components/malfi/home/HeroSection';
import FeaturedDishes from '@/components/malfi/home/FeaturedDishes';
import CategoryTiles from '@/components/malfi/home/CategoryTiles';
import StorySection from '@/components/malfi/home/StorySection';
import GallerySection from '@/components/malfi/home/GallerySection';
import ReservationCTA from '@/components/malfi/home/ReservationCTA';
import OrderingCTA from '@/components/malfi/home/OrderingCTA';
import LocationHours from '@/components/malfi/home/LocationHours';
import InstagramStrip from '@/components/malfi/home/InstagramStrip';

export default function MalfiHome() {
  return (
    <div>
      <HeroSection />
      <FeaturedDishes />
      <CategoryTiles />
      <StorySection />
      <GallerySection />
      <ReservationCTA />
      <OrderingCTA />
      <LocationHours />
      <InstagramStrip />
    </div>
  );
}
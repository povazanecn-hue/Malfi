import HeroSection from '@/components/malfi/home/HeroSection';
import FeaturedDishes from '@/components/malfi/home/FeaturedDishes';
import CategoryTiles from '@/components/malfi/home/CategoryTiles';
import StorySection from '@/components/malfi/home/StorySection';
import GallerySection from '@/components/malfi/home/GallerySection';
import ReservationCTA from '@/components/malfi/home/ReservationCTA';
import OrderingCTA from '@/components/malfi/home/OrderingCTA';
import LocationHours from '@/components/malfi/home/LocationHours';
import InstagramStrip from '@/components/malfi/home/InstagramStrip';
import AppDownloadSection from '@/components/malfi/home/AppDownloadSection';
import ReviewsSection from '@/components/malfi/home/ReviewsSection';
import {
  ItalianQuote,
} from '@/components/malfi/decorative/ItalianDividers';
import { ItalianTricolorStripe } from '@/components/malfi/decorative/ItalianTricolorStripe';
import PullToRefresh from '@/components/malfi/PullToRefresh';

export default function MalfiHome() {
  const handleRefresh = () => new Promise(resolve => setTimeout(() => { window.location.reload(); resolve(); }, 500));

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <div className="bg-cream">
      <HeroSection />
      <ItalianTricolorStripe />
      <FeaturedDishes />
      <ItalianTricolorStripe />
      <CategoryTiles />
      <ItalianTricolorStripe />
      <StorySection />
      <ItalianQuote text="La dolce vita" />
      <OrderingCTA />
      <ItalianTricolorStripe />
      <ReservationCTA />
      <GallerySection />
      <AppDownloadSection />
      <ReviewsSection />
      <LocationHours />
      <InstagramStrip />
    </div>
  );
}
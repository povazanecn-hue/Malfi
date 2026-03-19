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
  OliveBranchDivider,
  WaveDivider,
  WaveDividerReverse,
  ItalianQuote,
} from '@/components/malfi/decorative/ItalianDividers';

export default function MalfiHome() {
  return (
    <div className="bg-cream">
      <HeroSection />
      <OliveBranchDivider />
      <FeaturedDishes />
      <WaveDivider />
      <CategoryTiles />
      <WaveDividerReverse />
      <StorySection />
      <ItalianQuote text="La dolce vita" />
      <OrderingCTA />
      <OliveBranchDivider />
      <ReservationCTA />
      <GallerySection />
      <AppDownloadSection />
      <ReviewsSection />
      <LocationHours />
      <InstagramStrip />
    </div>
  );
}
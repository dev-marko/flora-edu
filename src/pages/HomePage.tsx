import HeroSection from '@/components/HeroSection/HeroSection';
import MostPopularArticles from '@/components/MostPopularArticles/MostPopularArticles';
import MostPopularPlants from '@/components/MostPopularPlants/MostPopularPlants';

const HomePage = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <MostPopularPlants></MostPopularPlants>
      <MostPopularArticles></MostPopularArticles>
    </>
  );
};

export default HomePage;

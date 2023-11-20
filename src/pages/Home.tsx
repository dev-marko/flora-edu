import HeroSection from '@/components/HeroSection/HeroSection';
import MostPopularArticles from '@/components/MostPopularArticles/MostPopularArticles';
import MostPopularPlants from '@/components/MostPopularPlants/MostPopularPlants';

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <MostPopularPlants></MostPopularPlants>
      <MostPopularArticles></MostPopularArticles>
    </>
  );
};

export default Home;

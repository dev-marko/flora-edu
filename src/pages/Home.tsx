import ArticlesApi from '@/apis/blog-api';
import PlantsApi from '@/apis/plants-api';
import HeroSection from '@/components/HeroSection/HeroSection';
import MostPopularArticles from '@/components/MostPopularArticles/MostPopularArticles';
import MostPopularPlants from '@/components/MostPopularPlants/MostPopularPlants';
import { defer } from 'react-router-dom';

export function loader() {
  return defer({
    mostPopularPlants: PlantsApi.getMostPopularPlants(),
    mostPopularArticles: ArticlesApi.getMostPopularArticles(),
  });
}

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

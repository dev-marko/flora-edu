import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/shared/Layout';

import HomePage from '@/pages/HomePage';
import AboutUs from '@/pages/AboutUs';

const RootNavigation = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Route>
    </Routes>
  );
};

export default RootNavigation;

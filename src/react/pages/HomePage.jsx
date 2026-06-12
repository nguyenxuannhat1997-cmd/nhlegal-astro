import React from 'react';
import SEOMeta from '../SEOMeta';
import Reveal from '../Reveal';
import Hero from '../Hero';
import PracticeAreas from '../PracticeAreas';
import Trust from '../Trust';
import About from '../About';
import CaseStudies from '../CaseStudies';
import Testimonials from '../Testimonials';
import Insights from '../Insights';
import AISection from '../AISection';
import Process from '../Process';
import Contact from '../Contact';

const HomePage = () => (
  <main>
    <SEOMeta
      description="N.H Legal — Công ty Luật TNHH Một Thành Viên tư vấn pháp lý chuyên sâu cho doanh nghiệp, SME và startup tại TP. Hồ Chí Minh. Dịch vụ: hợp đồng, doanh nghiệp, bất động sản, lao động, ly hôn."
      path="/"
    />
    <Hero />
    <Reveal><PracticeAreas /></Reveal>
    <Reveal><Trust /></Reveal>
    <Reveal><About /></Reveal>
    <Reveal><CaseStudies /></Reveal>
    <Reveal><Testimonials /></Reveal>
    <Reveal><Insights /></Reveal>
    <Reveal><AISection /></Reveal>
    <Reveal><Process /></Reveal>
    <Reveal><Contact /></Reveal>
  </main>
);

export default HomePage;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import PolicyPage from './pages/PolicyPage';
import TermsPage from './pages/TermsPage';
import ServicePage from './pages/ServicePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import ResourceHubPage from './pages/ResourceHubPage';
import NotFoundPage from './pages/NotFoundPage';

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chinh-sach-bao-mat" element={<PolicyPage />} />
          <Route path="/dieu-khoan-su-dung" element={<TermsPage />} />
          <Route path="/dich-vu/:slug" element={<ServicePage />} />
          <Route path="/bai-viet" element={<BlogListPage />} />
          <Route path="/bai-viet/:slug" element={<BlogPostPage />} />
          <Route path="/tai-lieu" element={<ResourceHubPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

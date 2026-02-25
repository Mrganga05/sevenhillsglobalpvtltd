import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import { CartDrawer } from "./components/CartDrawer";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage";

const ProductDetail = lazy(() => import("./pages/ProductDetail"));
import ExportProcess from "./pages/ExportProcess";
import Certifications from "./pages/Certifications";
import GlobalPresence from "./pages/GlobalPresence";
import Contact from "./pages/Contact";

import AdminLogin from "./admin/Login";
import AdminLayout from "./components/layout/AdminLayout";

const AdminDashboard = lazy(() => import("./admin/Dashboard"));
const ProductsAdmin = lazy(() => import("./admin/ProductsAdmin"));
const CategoriesAdmin = lazy(() => import("./admin/CategoriesAdmin"));
const InquiriesAdmin = lazy(() => import("./admin/InquiriesAdmin"));
const StatsAdmin = lazy(() => import("./admin/StatsAdmin"));
const TestimonialsAdmin = lazy(() => import("./admin/TestimonialsAdmin"));
const SubproductsAdmin = lazy(() => import("./admin/SubproductsAdmin"));
const CertificationsAdmin = lazy(() => import("./admin/CertificationsAdmin"));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gold">Loading Page...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/collections/:categorySlug" element={<CategoryPage />} />
          <Route path="/export-process" element={<ExportProcess />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/global-presence" element={<GlobalPresence />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="products/:productId/subproducts" element={<SubproductsAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="inquiries" element={<InquiriesAdmin />} />
          <Route path="stats" element={<StatsAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="certifications" element={<CertificationsAdmin />} />
        </Route>
      </Routes>
      <CartDrawer />
    </Suspense>
  );
}

export default App;

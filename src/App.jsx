import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./src/contexts/AuthContext";
import { ProtectedRoute } from "./src/components/ProtectedRoute";
import { Navbar } from "./src/components/NavbarNew";
import { Footer } from "./src/components/FooterNew";
import { HomePage } from "./src/pages/HomePageNew";
import { ResearchListPage } from "./src/pages/ResearchListPageNew";
import { ResearchDetailPage } from "./src/pages/ResearchDetailPageNew";
import { LoginPage } from "./src/pages/LoginPageNew";
import { AdminLoginPage } from "./src/pages/AdminLoginPage";
import { AdminDashboard } from "./src/pages/AdminDashboardNew";
import { UserProfilePage } from "./src/pages/UserProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/research" element={<ResearchListPage />} />
              <Route path="/research/:id" element={<ResearchDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ChatProvider } from './contexts/ChatContext';
import { OrganizationProvider } from './contexts/OrganizationContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { VerifyEmail } from './pages/auth/VerifyEmail';
import { ResetPassword } from './pages/auth/ResetPassword';
import { PrivateRoute } from './components/PrivateRoute';
import { Onboarding } from './pages/onboarding/Onboarding';
import { Settings } from './features/settings/pages/Settings';
import { AdminLayout } from './features/admin/components/AdminLayout';
import { AdminOverview } from './features/admin/pages/AdminOverview';
import { AdminOrganizations } from './features/admin/pages/AdminOrganizations';
import { AdminUsers } from './features/admin/pages/AdminUsers';
import { AdminBilling } from './features/admin/pages/AdminBilling';
import { AdminSettings } from './features/admin/pages/AdminSettings';
import { Properties } from './features/properties/pages/Properties';
import { PropertyProfile } from './features/properties/pages/PropertyProfile';
import { Conversations } from './pages/conversations/Conversations';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="remodl-theme">
        <AuthProvider>
          <OrganizationProvider>
            <ChatProvider>
              <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/verify" element={<VerifyEmail />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/onboarding" element={<Onboarding />} />
                
                {/* Settings & Admin Routes */}
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Settings />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings/global/admin"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <AdminLayout>
                          <AdminOverview />
                        </AdminLayout>
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings/global/admin/organizations"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <AdminLayout>
                          <AdminOrganizations />
                        </AdminLayout>
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings/global/admin/users"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <AdminLayout>
                          <AdminUsers />
                        </AdminLayout>
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings/global/admin/billing"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <AdminLayout>
                          <AdminBilling />
                        </AdminLayout>
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings/global/admin/settings"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <AdminLayout>
                          <AdminSettings />
                        </AdminLayout>
                      </Layout>
                    </PrivateRoute>
                  }
                />
                
                {/* Main App Routes */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/properties"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Properties />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/properties/:id"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <PropertyProfile />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/conversations"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Conversations />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/conversations/:id"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Conversations />
                      </Layout>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </ChatProvider>
          </OrganizationProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
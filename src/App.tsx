import { SupabaseAuthProvider } from './contexts/authContext/SupabaseAuthContext';
import { DataProvider } from './contexts/authContext/DataContext';
import AuthProvider from './contexts/authContext/AuthContext';
import RouteMain from './routes/MainRouter';
import Global from './styles/global';

function App() {
  return (
    <SupabaseAuthProvider>
      <DataProvider>
        <AuthProvider>
          <Global />
          <RouteMain />
        </AuthProvider>
      </DataProvider>
    </SupabaseAuthProvider>
  );
}

export default App;

import { SupabaseAuthProvider } from './contexts/authContext/SupabaseAuthContext';
import { DataProvider } from './contexts/authContext/DataContext';
import RouteMain from './routes/MainRouter';
import Global from './styles/global';

function App() {
  return (
    <SupabaseAuthProvider>
      <DataProvider>
        <Global />
        <RouteMain />
      </DataProvider>
    </SupabaseAuthProvider>
  );
}

export default App;

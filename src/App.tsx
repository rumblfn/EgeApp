import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { HomePage } from './routes/Home';
import { Footer } from './components/footer';
import { SubjectPage } from './routes/Subject';
import { AuthPage } from './routes/Auth';
import ProtectedRoute from './hocs/PrivateRoute';
import { UserPage } from './routes/User';
import { useTypedSelector } from './hooks/useTypedSelector';
import { SubjectTaskPage } from './routes/SubjectTask';
import { NewArticlePage } from './routes/newArticle';
import { ArticlePage } from './routes/Article';

function App() {
  const isUserAuthed = useTypedSelector<any>(state => state.user.user.statusUser);

  return (
    <div className="App" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header/>
      <Routes>
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/new" element={
          <ProtectedRoute 
            isAuthenticated={isUserAuthed}
            authenticationPath="/auth"
          >
            <NewArticlePage/>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute 
            isAuthenticated={isUserAuthed}
            authenticationPath="/auth"
          >
            <UserPage/>
          </ProtectedRoute>
        } />
        <Route path="/article/:id" element={<ArticlePage/>} />
        <Route path="/subject/:subjectId" element={<SubjectPage/>} />
        <Route path="/subject/:subjectId/:taskId" element={<SubjectTaskPage/>} />
        <Route path="/*" element={
          <HomePage />
        } />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

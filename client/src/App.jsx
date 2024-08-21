import "./App.css";
import Home from "./Pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NoteProvider } from "./Context/Context";

function App() {
  return (
    <>
      <NoteProvider>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_APP_PUBLIC_GOOGLE_API_TOKEN}
        >
          <Home />
        </GoogleOAuthProvider>
      </NoteProvider>
    </>
  );
}

export default App;

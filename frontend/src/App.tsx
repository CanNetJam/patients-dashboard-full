import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import DefaultTemplate from "./layout/DefaultTemplate";
import PatientList from "./pages/PatientList";
import PatientEntry from "./pages/PatientEntry";
import PatientDetails from "./pages/PatientDetails";
import { UserContextProvider } from "./context/userContext";

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route path="dashboard" element={<DefaultTemplate />}>
                        <Route index element={<PatientList />} />
                        <Route path="add-new-patient" element={<PatientEntry />} />
                        <Route path=":patientId" element={<PatientDetails />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    )
}

export default App

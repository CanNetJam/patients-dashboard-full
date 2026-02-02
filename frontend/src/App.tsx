import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import DefaultTemplate from "./layout/DefaultTemplate";
import PatientList from "./pages/PatientList";
import PatientEntry from "./pages/PatientEntry";
import PatientDetails from "./pages/PatientDetails";
import { UserContextProvider } from "./context/userContext";
import { ProtectedRoute } from "./context/ProtectedRoute";

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route
                        path="dashboard"
                        element={<DefaultTemplate />}
                    >
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <PatientList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="add-new-patient"
                            element={
                                <ProtectedRoute>
                                    <PatientEntry />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path=":patientId"
                            element={
                                <ProtectedRoute>
                                    <PatientDetails />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    )
}

export default App

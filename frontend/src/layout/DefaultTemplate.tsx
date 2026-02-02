import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function DefaultTemplate() {
    return (
        <>
            <div className="min-h-screen h-auto w-full bg-linear-to-b from-gray-100 via-gray-50 to-gray-200 mb-2">
                <div className="flex flex-col items-center gap-4 p-2">
                    <Header />
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}
import logo from "../assets/MCM-logo.png";

export default function Footer() {
    return (
        <div className="bg-slate-900 sm:h-auto h-auto w-full sm:px-10 px-4">
            <div className='grid justify-center gap-2 sm:flex sm:flex-row-reverse sm:justify-between md:px-6 sm:px-2 py-2 items-center'>
                <div className='flex justify-center items-center text-slate-400 gap-8'>
                    <div className='h-12 w-auto'>
                        <img src={logo} className='h-full w-full object-scale-down' alt='App icon' />
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-slate-400 text-sm'>© 2026 MCM. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
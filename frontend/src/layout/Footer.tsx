export default function Footer() {
    return (
        <div className="bg-slate-900 sm:h-auto h-auto w-full sm:px-10 px-4">
            <div className='grid justify-center gap-2 sm:flex sm:flex-row-reverse sm:justify-between md:px-6 sm:px-2 py-2 items-center'>
                <div className='flex justify-center items-center text-slate-400 gap-8'>
                    <a href='https://www.tiktok.com/@klued_' target='_blank' className='cursor-pointer hover:text-slate-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" /></svg>
                    </a>
                    <a href='https://www.facebook.com/Klued' target='_blank' className='cursor-pointer hover:text-slate-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                    </a>
                    <a href='https://www.instagram.com/klued_/' target='_blank' className='cursor-pointer hover:text-slate-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                    </a>
                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-slate-400 text-sm'>© 2024 Klued. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
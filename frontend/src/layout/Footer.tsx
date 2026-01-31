export default function Footer() {
    return (
        <div className="bg-slate-900 sm:h-auto h-auto w-full sm:px-10 px-4">
            <div className='grid md:flex md:justify-between md:gap-20 border-b gap-y-8 border-slate-700 py-10 sm:px-2'>
                <div className='max-w-125'>
                    <div className='h-12.5 sm:w-37.5 w-31.25 '>
                        <img height={'50px'} width={'150px'} title='tansparent Klued logo' alt='transparent Klued logo' loading='lazy' className='h-full w-full object-cover'/>
                    </div>
                    <p className='text-slate-400 md:pl-4'>"Combining knowledge and passion to the skin"</p>

                    <div className='text-slate-400 md:pl-4 grid gap-1.5 mt-8 sm:text-sm text-xs'>
                        <p className='grid grid-cols-10 gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-map-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" /><path d="M9 4v13" /><path d="M15 7v5.5" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" /><path d="M19 18v.01" /></svg>
                            <label className='col-span-9'>2nd Floor WANJ Bldg. Don Placido Campos Ave. Brgy. San Jose Dasmarinas, Cavite 4114</label>
                        </p>
                        <p className='grid grid-cols-10 gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                            <label className='col-span-9'>09176680429</label>
                        </p>
                        <p className='grid grid-cols-10 gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                            <label className='col-span-9'>support@kluedskincare.com</label>
                        </p>
                    </div>
                </div>

                {/* <div className='w-full max-w-[500px] grid grid-cols-2 gap-10'>
                    <div>
                        <div className='mb-2'>
                            <label className='font-semibold text-white'>Links</label>
                        </div>
                        <ul className='text-slate-400 sm:text-base text-sm'>
                            <li><Link to="/products" className='hover:text-slate-200'>Our Products</Link></li>
                            <li><Link to="/understanding-your-skin" className='hover:text-slate-200'>Understanding your Skin</Link></li>
                            <li><Link to="/about-us" className='hover:text-slate-200'>About Us</Link></li>
                            <li><Link to="/faqs" className='hover:text-slate-200'>FAQs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <div className='mb-2'>
                            <label className='font-semibold text-white'>Legal</label>
                        </div>
                        <ul className='text-slate-400 sm:text-base text-sm'>
                            <li><Link to="/terms-of-use" className='hover:text-slate-200'>Terms of Use</Link></li>
                            <li><Link to="/refund-policy" className='hover:text-slate-200'>Refund Policy</Link></li>
                        </ul>
                    </div>
                </div> */}
            </div>

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
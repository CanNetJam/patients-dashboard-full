import empty from "../assets/empty.png";


export default function EmptyIndicator() {
    return (
        <div className='h-full max-h-[50vh] w-full flex flex-col justify-center items-center bg-gray-50 rounded-xl overflow-hidden'>
            <div className='sm:h-56 sm:w-56 h-36 w-36 py-2 opacity-80'>
                <img className='h-full w-full object-contain' src={empty} />
            </div>
            <p className='text-gray-400 sm:text-sm text-xs max-w-80 text-center'>Looks like the list is empty, try adding data now.</p>
        </div>
    );
}
import { userNameContext } from "../hooks/userNameContext";
import logo from "../assets/MCM-icon.png";
import { useLogOut } from "../hooks/useLogout";

export default function Header() {
    const { name } = userNameContext();
    const { logOut } = useLogOut();

    return (
        <div className="h-auto w-full bg-white rounded-full flex items-center px-4 py-1 justify-between">
            <div className='h-12 w-auto'>
                <img src={logo} className='h-full w-full object-scale-down' alt='App logo' />
            </div>

            <div className='h-10 w-auto flex gap-2 items-center'>
                <div className="h-8 w-8">
                    <svg className="h-full w-full fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q14-36 44-58t68-22q38 0 68 22t44 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm280-670q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm280-194q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41ZM280-200h400v-10q-42-35-93-52.5T480-280q-56 0-107 17.5T280-210v10Zm200-320q-25 0-42.5-17.5T420-580q0-25 17.5-42.5T480-640q25 0 42.5 17.5T540-580q0 25-17.5 42.5T480-520Zm0 17Z" /></svg>
                </div>

                <div className='grid whitespace-nowrap'>
                    <span className='text-sm font-medium capitalize'>{name}</span>
                    <span className='text-xs text-gray-500 leading-2.5'>Administrator</span>
                </div>

                <button
                    onClick={logOut}
                    className='border-l border-gray-300 p-2 h-full flex items-center cursor-pointer'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                </button>
            </div>
        </div>
    )
}
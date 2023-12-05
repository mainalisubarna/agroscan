import { Outlet } from 'react-router-dom';
export default function SFormLayout() {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <div className='Main_Content flex-grow'>
                    <Outlet />
                </div>
                <footer className='Footer mb-0 py-4 rounded-sm bg-white'>
                    <div className="container mx-auto text-center">
                        <p className="text-sm leading-6 text-gray-900">COPYRIGHT © {new Date().getFullYear()} | AGROSCAN | ALL RIGHTS RESERVED.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}
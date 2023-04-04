'use client'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
const UserMenu = () => {
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div  onClick={() => {}}
                    className='hidden
                               md:block
                               text-sm
                               font-semibold
                               py-3
                               px-4
                               rounded-full
                               hover:bg-neutral-100
                               transition
                               cursor-pointer '
                >
                    Airbnb your home
                </div>
                <div className="p-4 md:py-1 md:px-2 flex flex-row 
                                items-center gap-3 rounded-full 
                                cursor-pointer transition
                                border-neutral-200 hover:shadow-md
                                "
                                onClick={() => {}}
                                >
                                <AiOutlineMenu />
                </div>
                <div className="hidden md:block">
                    <Avatar />
                </div>
            </div>
        </div>
    )
}

export default UserMenu
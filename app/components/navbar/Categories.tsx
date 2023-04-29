'use client'

import Container from "../Container"
import {TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import {GiBoatFishing, GiForestCamp, GiIsland, GiMountains, GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla, MdSurfing} from 'react-icons/md'
import {IoDiamond} from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"

export const categories = [
    {
        label : 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'
    },
    {
        label: 'Country_Side',
        icon: TbMountain,
        description: 'This property is in the Countryside'
    },
    {
        label: 'Surfing',
        icon: MdSurfing,
        description: 'This property has Surfing Facility'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a Pool'
    },
    {
        label: 'Island',
        icon: GiIsland,
        description: 'This property is in an Island Zone'
    },
    {
        label: 'Fishing',
        icon: GiBoatFishing,
        description: 'Recreational Fishing Activities Allowed'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'Camping Facilities Available'
    },
    {
        label: 'Snow_Surfing',
        icon: BsSnow,
        description: 'Snow Surfing Available'
    },
    {
        label: 'Hiking',
        icon: GiMountains,
        description: 'Mountain Hiking Available'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This is a Luxurious Property'
    }
    
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    
    if(!isMainPage){
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon} />
                ))}
            </div>
        </Container>
    )
}

export default Categories
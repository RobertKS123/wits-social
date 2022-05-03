import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';

export const BottombarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Trending',
        path: '/trending',
        icon: <HiIcons.HiTrendingUp />,
        cName: 'nav-text'     
    },
    {
        title: 'Create',
        path: '/create',
        icon: <BsIcons.BsPlusCircle />,
        cName: 'nav-text'     
    },
    {
        title: 'Create',
        path: '/create',
        icon: <HiIcons.HiOutlineInboxIn />,
        cName: 'nav-text' 
    },
    {
        title: 'Account',
        path: '/account',
        icon: <MdIcons.MdManageAccounts />,
        cName: 'nav-text'     
    }
]
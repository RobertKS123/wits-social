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
        cName: 'bottom-nav-item'
    },
    {
        title: 'Trending',
        path: '/trending',
        icon: <HiIcons.HiTrendingUp />,
        cName: 'bottom-nav-item'     
    },
    {
        title: 'Create',
        path: '/create',
        icon: <BsIcons.BsPlusCircle />,
        cName: 'bottom-nav-item'     
    },
    {
        title: 'Inbox',
        path: '/inbox',
        icon: <HiIcons.HiOutlineInboxIn />,
        cName: 'bottom-nav-item' 
    },
    {
        title: 'Account',
        path: '/account',
        icon: <MdIcons.MdManageAccounts />,
        cName: 'bottom-nav-item'     
    }
]
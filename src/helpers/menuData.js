import { MdOutlinePersonOutline, MdCalendarViewWeek, MdOutlineBungalow, MdPeopleOutline } from 'react-icons/md'
import { IoMdCard } from 'react-icons/io'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { AiOutlineHome } from 'react-icons/ai'

export const menuData = {
    member : [
        {
            label: 'Dashboard',
            icon: <AiOutlineHome />,
            link: 'dashboard'
        },
        {
            label: 'Loans',
            icon: <SiHomeassistantcommunitystore />,
            link: 'loans',
            sublinks: [
                {
                    label: 'Request',
                    link: 'loans/request'
                },
                {
                    label: 'Payment',
                    link: 'loans/payment'
                }
            ]
        },
        {
            label: 'Deposit',
            icon: <RiExchangeDollarLine />,
            link: 'deposit',
            sublinks: [
                {
                    label: 'Deposit',
                    link: '/deposit/deposit'
                }
            ]
        },
        {
            label: 'Withdraw',
            icon: <IoMdCard />,
            link: 'withdraw',
            sublinks: [
                {
                    label: 'Request',
                    link: 'withdraw/request'
                }
            ]
        },
        {
            label: 'Accounts',
            icon: <MdCalendarViewWeek />,
            link: 'accounts',
            sublinks: [
                {
                    label: 'Shares',
                    link: 'accounts/shares'
                },
                {
                    label: 'Mwanaa',
                    link: 'accounts/mwana'
                },
                {
                    label: 'Fixed',
                    link: 'accounts/fixed'
                },
                {
                    label: 'Savings',
                    link: 'accounts/savings'
                }
            ]
        },
        {
            label: 'Profile',
            icon: <MdOutlinePersonOutline />,
            link: 'profile'
        }
    ],
    admin : [
        {
            label: 'Dashboard',
            icon: <AiOutlineHome />,
            link: 'dashboard'
        },
        {
            label: 'Loans',
            icon: <SiHomeassistantcommunitystore />,
            link: 'loans',
            sublinks: [
                {
                    label: 'Request',
                    link: 'loans/request'
                },
                {
                    label: 'Member Loans',
                    link: 'loans/members'
                },
                {
                    label: 'Member Applications',
                    link: 'loans/applications'
                }
            ]
        },
        {
            label: 'Deposit',
            icon: <RiExchangeDollarLine />,
            link: 'deposit',
            sublinks: [
                {
                    label: 'Make Deposit',
                    link: '/deposit/deposit'
                },
                {
                    label: 'Deposit Applications',
                    link: '/deposit/members'
                }
            ]
        },
        {
            label: 'Withdraw',
            icon: <IoMdCard />,
            link: 'withdraw',
            sublinks: [
                {
                    label: 'Request',
                    link: 'withdraw/request'
                },
                {
                    label: 'Member Withdraw',
                    link: 'withdraw/members'
                }
            ]
        },
        {
            label: 'Accounts',
            icon: <MdCalendarViewWeek />,
            link: 'accounts',
            sublinks: [
                {
                    label: 'Savings',
                    link: 'accounts/savings'
                },
                {
                    label: 'Shares',
                    link: 'accounts/shares'
                },
                {
                    label: 'Mwanaa',
                    link: 'accounts/mwana'
                },
                {
                    label: 'Fixed',
                    link: 'accounts/fixed'
                },
            ]
        },
        {
            label: 'Members',
            icon: <MdPeopleOutline />,
            link: 'members',
            sublinks: [
                {
                    label: 'Applications',
                    link: 'members/applications'
                }
            ]
        },
        {
            label: 'Profile',
            icon: <MdOutlinePersonOutline />,
            link: 'profile'
        }
    ]
}
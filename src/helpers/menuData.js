import { MdOutlinePersonOutline, MdCalendarViewWeek, MdOutlineBungalow, MdPeopleOutline } from 'react-icons/md'
import { IoMdCard } from 'react-icons/io'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { SiHomeassistantcommunitystore } from 'react-icons/si'

export const menuData = {
    member : [
        {
            label: 'Dashboard',
            icon: <MdOutlineBungalow />,
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
            icon: <MdOutlineBungalow />,
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
                },
                {
                    label: 'Verify',
                    link: 'loans/verify'
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
                    label: 'Verify',
                    link: '/deposit/verify'
                },
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
                    label: 'Verify',
                    link: 'withdraw/verify'
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
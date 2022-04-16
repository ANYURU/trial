import { MdOutlinePersonOutline, MdCalendarViewWeek, MdOutlineBungalow } from 'react-icons/md'
import { IoMdCard } from 'react-icons/io'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { SiHomeassistantcommunitystore } from 'react-icons/si'


const menuData = {
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
                    label: 'History',
                    link: 'loans/history'
                },
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
                },
                {
                    label: 'history',
                    link: 'deposit/history'
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
                    label: 'History',
                    link: 'withdraw/history'
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
                // {
                //     label: 'History',
                //     link: 'loans/history'
                // },
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
                    label: 'Make Deposit',
                    link: '/deposit/deposit'
                },
                // {
                //     label: 'history',
                //     link: 'deposit/history'
                // }
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
                // {
                //     label: 'History',
                //     link: 'withdraw/history'
                // }
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
            icon: <MdOutlinePersonOutline />,
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



export { menuData }
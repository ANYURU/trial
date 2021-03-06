export const users = [
    {
        name: 'Charles Kasasira',
        phoneNo: '0750118523',
        password: 'passwd123',
        email: 'charleskasasira01@gmail.com',
        memberStatus: 'inactive',
        maritalStatus: 'single',
        saccoPosition: 'member',
        role: 'member'
    },
    {
        name: 'Anyuru David Derrick',
        phoneNo: '0750118500',
        password: 'passwd321',
        email: 'anyurudavidderrick@gmail.com',
        memberStatus: 'active',
        maritalStatus: 'single',
        saccoPosition: 'administrator',
        role: 'admin'
    }
]

export const loanHistory = [
    {
        date: '11-04-2022',
        amountToPay: 20000,
        amountPaid: 5000,
        principal: 20000,
        interest: 5,
        status: 'Pending'
    },
    {
        date: '12-04-2022',
        amountToPay: 64000,
        amountPaid: 4000,
        principal: 100000,
        interest: 5,
        status: 'Paid'
    },
    {
        date: '01-04-2022',
        amountToPay: 20000,
        amountPaid: 5000,
        principal: 20000,
        interest: 5,
        status: 'Pending'
    },
    {
        date: '07-06-2021',
        amountToPay: 64000,
        amountPaid: 4000,
        principal: 100000,
        interest: 5,
        status: 'Paid'
    }
]

export const depositHistory = [
    {
        date: '11-04-2022',
        transactionId: 190012186,
        account: 'Savings',
        amount: 300000,
        depositMethod: 'Bank',
        status: 'Approved'
    },
    {
        date: '11-04-2019',
        transactionId: 190012067,
        account: 'Shares',
        amount: 180000,
        depositMethod: 'Bank',
        status: 'Approved'
    },
]

export const memberApplications = [
    {
        date: '11-21-2021',
        name: 'Nakityo Joanita',
        id: 213103938,
        amount: 500000,
        status: 'Approved'
    },
    {
        date: '03-03-2022',
        name: 'Anyuru David',
        id: 213103938,
        amount: 300000,
        status: 'Pending'
    },
    {
        date: '01-04-2022',
        name: 'Kasasira Charles',
        id: 213103938,
        amount: 180000,
        status: 'Rejected'
    },
]
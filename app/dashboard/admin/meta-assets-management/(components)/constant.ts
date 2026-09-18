export const transactionData = [
  {
    id: '133790778234688',
    userId: '12175688',
    type: 'Deposit',
    dateTime: '12 JAN 2024 10:12 am',
    status: 'Failed',
    amount: '$1200',
    method: 'Bank Transfer',
  },
  {
    id: '133790778234689',
    userId: '12175689',
    type: 'Deposit',
    dateTime: '13 JAN 2024 10:20 am',
    status: 'Failed',
    amount: '$1500',
    method: 'Bank Transfer',
  },
  {
    id: '133790778234689',
    userId: '12175689',
    type: 'Deposit',
    dateTime: '13 JAN 2024 10:20 am',
    status: 'Failed',
    amount: '$1500',
    method: 'Bank Transfer',
  },
  {
    id: '133790778234689',
    userId: '12175689',
    type: 'Deposit',
    dateTime: '13 JAN 2024 10:20 am',
    status: 'Failed',
    amount: '$1500',
    method: 'Bank Transfer',
  },
  {
    id: '133790778234689',
    userId: '12175689',
    type: 'Deposit',
    dateTime: '13 JAN 2024 10:20 am',
    status: 'Failed',
    amount: '$1500',
    method: 'Bank Transfer',
  },
  {
    id: '133790778234689',
    userId: '12175689',
    type: 'Deposit',
    dateTime: '13 JAN 2024 10:20 am',
    status: 'Failed',
    amount: '$1500',
    method: 'Bank Transfer',
  },
  {
    id: '133790778234689',
    userId: '12175689',
    type: 'Deposit',
    dateTime: '13 JAN 2024 10:20 am',
    status: 'Failed',
    amount: '$1500',
    method: 'Bank Transfer',
  },
  {
    id: '133790778234689',
    userId: '12175689',
    type: 'Deposit',
    dateTime: '13 JAN 2024 10:20 am',
    status: 'Failed',
    amount: '$1500',
    method: 'Bank Transfer',
  },
  {
    id: '133790778234689',
    userId: '12175689',
    type: 'Deposit',
    dateTime: '13 JAN 2024 10:20 am',
    status: 'Failed',
    amount: '$1500',
    method: 'Bank Transfer',
  },
];

export const transactions = [
  {
    date: '12 JAN 2024',
    id: '133780776234168',
    amount: '$ 1,200',
    status: 'Successful',
  },
  {
    date: '12 JAN 2024',
    id: '133780776234168',
    amount: '$ 1,200',
    status: 'Failed',
  },
  {
    date: '12 JAN 2024',
    id: '133780776234168',
    amount: '$ 1,200',
    status: 'Pending',
  },
  {
    date: '12 JAN 2024',
    id: '133780776234168',
    amount: '$ 1,200',
    status: 'Successful',
  },
  {
    date: '12 JAN 2024',
    id: '133780776234168',
    amount: '$ 1,200',
    status: 'Failed',
  },
];

export const getStatusColor = (status: any) => {
  switch (status) {
    case 'Successful':
      return 'text-brand-mint';
    case 'Failed':
      return 'text-brand-red';
    case 'Pending':
      return 'text-white';
    default:
      return 'text-white';
  }
};

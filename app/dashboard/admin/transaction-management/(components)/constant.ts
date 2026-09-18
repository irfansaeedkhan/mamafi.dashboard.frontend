export interface Transaction {
  id: string;
  userId: string;
  type: 'Deposit' | 'Withdrawal' | 'Purchase';
  date: string;
  status: 'Successful' | 'Failed' | 'Pending';
  amount: string;
  method: string;
}

export const transactions: Transaction[] = [
  {
    id: '133780776234168',
    userId: '12175688',
    type: 'Deposit',
    date: '12 JAN 2024 10:12 am',
    status: 'Successful',
    amount: '1,200',
    method: 'Bank Transfer',
  },
  {
    id: '133780776234168',
    userId: '12175688',
    type: 'Withdrawal',
    date: '12 JAN 2024 10:12 am',
    status: 'Failed',
    amount: '1,200',
    method: 'Bank Transfer',
  },
  {
    id: '133780776234168',
    userId: '12175688',
    type: 'Purchase',
    date: '12 JAN 2024 10:12 am',
    status: 'Pending',
    amount: '1,200',
    method: 'Bank Transfer',
  },
  {
    id: '133780776234168',
    userId: '12175688',
    type: 'Deposit',
    date: '12 JAN 2024 10:12 am',
    status: 'Successful',
    amount: '1,200',
    method: 'Bank Transfer',
  },
  {
    id: '133780776234168',
    userId: '12175688',
    type: 'Deposit',
    date: '12 JAN 2024 10:12 am',
    status: 'Successful',
    amount: '1,200',
    method: 'Bank Transfer',
  },
  // Additional data for pagination testing
  {
    id: '133780776234169',
    userId: '12175689',
    type: 'Deposit',
    date: '13 JAN 2024 11:15 am',
    status: 'Successful',
    amount: '2,500',
    method: 'Bank Transfer',
  },
  {
    id: '133780776234170',
    userId: '12175690',
    type: 'Withdrawal',
    date: '14 JAN 2024 09:30 am',
    status: 'Pending',
    amount: '800',
    method: 'Bank Transfer',
  },
  {
    id: '133780776234171',
    userId: '12175691',
    type: 'Purchase',
    date: '15 JAN 2024 03:45 pm',
    status: 'Successful',
    amount: '350',
    method: 'Credit Card',
  },
  {
    id: '133780776234172',
    userId: '12175692',
    type: 'Deposit',
    date: '16 JAN 2024 02:20 pm',
    status: 'Failed',
    amount: '1,750',
    method: 'Bank Transfer',
  },
  {
    id: '133780776234173',
    userId: '12175693',
    type: 'Purchase',
    date: '17 JAN 2024 10:10 am',
    status: 'Successful',
    amount: '500',
    method: 'Credit Card',
  },
  {
    id: '133780776234174',
    userId: '12175694',
    type: 'Withdrawal',
    date: '18 JAN 2024 01:40 pm',
    status: 'Successful',
    amount: '3,000',
    method: 'Bank Transfer',
  },
];

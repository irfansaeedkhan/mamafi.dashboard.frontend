export type LeaderBoardProps = {
  position: string;
  user_name: string;
  name: string;
  profile_path: string;
  wallet_address: string;
  score: number;
};

export const LeaderboardData: LeaderBoardProps[] = [
  {
    position: '1.',
    user_name: 'Trace',
    name: 'Trace Lunga',
    profile_path: '/images/register.png',
    wallet_address: 'Xcrecxx00000ffcx02vcx0',
    score: 17500,
  },
  {
    position: '2.',
    user_name: 'JohnDoe',
    name: 'John Doe',
    profile_path: '/images/register.png',
    wallet_address: 'Xcrecxx00000ffcx02vcx1',
    score: 15000,
  },
  {
    position: '3.',
    user_name: 'JaneDoe',
    name: 'Jane Doe',
    profile_path: '/images/register.png',
    wallet_address: 'Xcrecxx00000ffcx02vcx2',
    score: 13000,
  },
  {
    position: '4.',
    user_name: 'Alice',
    name: 'Alice Smith',
    profile_path: '/images/register.png',
    wallet_address: 'Xcrecxx00000ffcx02vcx3',
    score: 12000,
  },
  {
    position: '5.',
    user_name: 'Bob',
    name: 'Bob Johnson',
    profile_path: '/images/register.png',
    wallet_address: 'Xcrecxx00000ffcx02vcx4',
    score: 11000,
  },
  {
    position: '6.',
    user_name: 'Eva',
    name: 'Eva Williams',
    profile_path: '/images/register.png',
    wallet_address: 'Xcrecxx00000ffcx02vcx5',
    score: 10500,
  },
  {
    position: '7.',
    user_name: 'Mike',
    name: 'Mike Brown',
    profile_path: '/images/register.png',
    wallet_address: 'Xcrecxx00000ffcx02vcx6',
    score: 10000,
  },
];

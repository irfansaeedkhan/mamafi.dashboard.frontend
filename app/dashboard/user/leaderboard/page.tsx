'use client';
import React, { useCallback, useEffect, useState } from 'react';
import LeaderboardTable from '@/components/dashboard/leaderboard/leaderboard-table';
import { LeaderboardTableMobile } from '@/components/dashboard/leaderboard/leaderboard-table-mobile';
import { LeaderBoardList, getLeaderBoard } from '@/lib/auth/get-leaderboard-list';

const LeaderBoard = () => {
  const [leaderboardList, setleaderboardList] = useState<LeaderBoardList>();
  const [isLoading, setIsLoading] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getLeaderboardDetails = useCallback(async () => {
    setIsLoading('pending');
    try {
      const res = await getLeaderBoard(page);
      setleaderboardList(res);
      setTotalPages(res.Number_of_Pages);
      setIsLoading('resolved');
    } catch (error) {
      setIsLoading('rejected');
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    getLeaderboardDetails();
  }, [getLeaderboardDetails]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };
  return (
    <div>
      <div className="hidden lg:block">
        <LeaderboardTable
          leaderboardList={leaderboardList as LeaderBoardList}
          isLoading={isLoading}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
        />
      </div>
      <div className="block lg:hidden">
        <LeaderboardTableMobile
          leaderboardList={leaderboardList as LeaderBoardList}
          isLoading={isLoading}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
        />
      </div>
    </div>
  );
};

export default LeaderBoard;

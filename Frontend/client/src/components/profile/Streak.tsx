import {FaFire,FaTrophy,FaPenNib} from "react-icons/fa";

import { useEffect, useState } from "react";

import { getWritingStreak } from "../../api/user";

function Streak_Card() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [writingDays, setWritingDays] = useState(0);

  const progress = longestStreak > 0 ? Math.min((currentStreak / longestStreak) * 100, 100) : 0;

  useEffect(() => {
    async function fetchStreakData() {
      try {
        const data = await getWritingStreak();
        setCurrentStreak(data.currentStreak);
        setLongestStreak(data.longestStreak);
        setWritingDays(data.writingDays);
      } catch (error) {
        console.error("Error fetching streak data:", error);
      }
    };

    fetchStreakData();
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body">

        <h2 className="card-title text-xl mb-4">
          🔥 Writing Streak
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          <div
            className="radial-progress text-primary"
            style={
              {
                "--value": progress,
                "--size": "8rem",
                "--thickness": "10px",
              } as React.CSSProperties
            }
          >
            <div className="text-center">
              <p className="text-3xl font-bold">
                {currentStreak}
              </p>

              <p className="text-xs">
                Days
              </p>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">

            <div className="flex items-center justify-between p-3 rounded-xl bg-base-200">

              <div className="flex items-center gap-3">
                <FaFire className="text-orange-500 text-xl" />

                <span>Current Streak</span>
              </div>

              <span className="font-bold">
                {currentStreak} Days
              </span>

            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-base-200">

              <div className="flex items-center gap-3">
                <FaTrophy className="text-yellow-500 text-xl" />

                <span>Longest Streak</span>
              </div>

              <span className="font-bold">
                {longestStreak} Days
              </span>

            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-base-200">

              <div className="flex items-center gap-3">
                <FaPenNib className="text-blue-500 text-xl" />

                <span>Writing Days</span>
              </div>

              <span className="font-bold">
                {writingDays}
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Streak_Card;
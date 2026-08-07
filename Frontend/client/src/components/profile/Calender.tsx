import { useMemo } from "react";

interface Activity {
  date: string; 
  posts: number;
}

interface ActivityCalendarProps {
  activity: Activity[];
}

function Calendar({
  activity,
}: ActivityCalendarProps) {
  console.log("Activity received : ", activity);
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startOffset = (firstDay.getDay() + 6) % 7;

  const daysInMonth = lastDay.getDate();

  const cells = useMemo(() => {
    const result = [];

    for (let i = 0; i < startOffset; i++) {
      result.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      result.push(new Date(year, month, day));
    }

    return result;
  }, [year, month, daysInMonth, startOffset]);

  const getActivity = (date: Date) => {

    const y = date.getFullYear();

    const m = String(date.getMonth() + 1).padStart(2, "0");

    const d = String(date.getDate()).padStart(2, "0");

    const formatted = `${y}-${m}-${d}`;

    console.log("Checking : ", formatted);

    return activity.find(item => item.date === formatted);
};

  const getColor = (posts: number) => {
    if (posts === 0) return "bg-gray-700";
    if (posts === 1) return "bg-green-500";
    if (posts === 2) return "bg-green-600";

    return "bg-green-700";
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">

        <h2 className="card-title text-xl">
          📅 Writing Activity
        </h2>

        <p className="text-sm opacity-70">
          {today.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="grid grid-cols-7 gap-2 mt-5 text-center font-semibold text-sm">

          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>

        </div>

        <div className="grid grid-cols-7 gap-2 mt-3">

          {cells.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={index}
                  className="aspect-square"
                />
              );
            }

            const info = getActivity(date);
            if(info) {
              console.log("Matched: " , date.getDate(), info);
            }

            return (
              <div
                key={date.toISOString()}
                className={`
                  aspect-square
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-semibold
                  transition
                  hover:scale-105
                  cursor-pointer
                  ${getColor(info?.posts ?? 0)}
                `}
                title={
                  info
                    ? `${info.posts} blog(s) published`
                    : "No activity"
                }
              >
                {date.getDate()}
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}

export default Calendar;
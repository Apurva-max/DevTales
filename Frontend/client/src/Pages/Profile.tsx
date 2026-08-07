import PHeader from "../components/profile/PHeader";
import Streak_Card from "../components/profile/Streak";
import About_Section from "../components/profile/PaboutSection";
import Calendar from "../components/profile/Calender";
import UserBlogs from "../components/profile/PuserBlogs";
import { useEffect, useState } from "react";
import { getCalendar } from "../api/user";

function ProfilePage() {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        async function fetchCalendar() {
            try {

               const calendar = await getCalendar();
               console.log(calendar);
               
               const formatted = calendar.map((item: any) => ({
                date: item.day,
                posts: 1,
            }));
            
            setActivity(formatted);

            console.log("Formatted: ", formatted);

            } catch (error) {
                console.log(error);
            }
        }

        fetchCalendar();
    }, []);

    console.log("Profile Activity: ", activity);

    return (

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

            <PHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Streak_Card />
        <About_Section />
      </div>

      <Calendar activity={activity}/>

      <UserBlogs />

        </div>
    )
}

export default ProfilePage;
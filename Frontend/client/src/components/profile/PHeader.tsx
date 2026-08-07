import { FaPen} from "react-icons/fa";

import Edit_Profile from "./Edit_Profile";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/profile";

function PHeader() {
  const [ user, setUser] = useState<any>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      
      try {
        
        const response = await getProfile();

        setUser(response.user);
      } catch (error) {
        
        console.log(error);
      }
    }

    fetchProfile();
  }, []);

  return ( 
    <>
      <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        </div>
        <div className="relative px-8 pb-8">

          <div className="-mt-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">

              <div className="avatar">
                <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">

                  <img
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.name || "User"
                      )}&background=6366f1&color=fff&size=256`
                    }
                    alt="Avatar"
                  />

                </div>
              </div>

              <div className="text-center sm:text-left">

                <h1 className="text-3xl font-bold">
                  {user?.name}
                </h1>

                <p className="text-base-content/70 mt-1">
                  {user?.occupation ||
                    "Full Stack Developer"}
                </p>

                <p className="mt-3 max-w-xl text-sm leading-6 text-base-content/80">
                  {user?.bio ||
                    "Passionate about building scalable full-stack applications using React, TypeScript, Node.js, Express and MongoDB."}
                </p>

              </div>

            </div>

            <button
              className="btn btn-primary"
              onClick={() => setOpen(true)}
            >
              <FaPen />
              Edit Profile
            </button>

          </div>

        </div>

      </div>

      <Edit_Profile
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default PHeader;
import {FaMapMarkerAlt,FaBriefcase,FaCalendarAlt,FaGithub,FaLinkedin} from "react-icons/fa";

import { useEffect, useState } from "react";
import { getProfile } from "../../api/profile";

function About_Section() {
  
  const [ user, setUser ] = useState<any>(null);

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

  if(!user) {
    return (

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          Loading....
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body">

        <h2 className="card-title text-xl mb-4">
          👤 About
        </h2>

        <div className="mb-5">
          <p className="text-sm leading-7 text-base-content/80">
            {user?.bio ||
              "Passionate Full Stack Developer who enjoys building scalable web applications with React, TypeScript, Node.js, Express and MongoDB. Always learning something new."}
          </p>
        </div>

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-primary" />
            <span>{user?.location || "India"}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaBriefcase className="text-primary" />
            <span>{user?.occupation || "Full Stack Developer"}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-primary" />
            <span>
              Joined{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>

        </div>

        <div className="divider"></div>

        <div>
          <h3 className="font-semibold mb-3">
            Connect
          </h3>

          <div className="flex gap-4 text-2xl">

          {user?.github ? (
            <a
              href={user?.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaGithub />
              GitHub
            </a>
          ) : (
            <p className="text-sm text-base-content/60">
              GitHub profile not added.
            </p>
          )}

            {user?.linkedin ? (
              <a
              href={user?.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaLinkedin />
              Linkedin
            </a>
            ) : (
              <p className="text-sm text-base-content/60">
                Linkedin profile not added.
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default About_Section;
import {useEffect, useState } from "react";
import { getProfile, updateProfile, uploadAvatar, removeAvatar } from "../../api/profile";

interface Props {

    open: boolean;
    onClose: () => void;
}

function Edit_Profile({
    open,
    onClose,
}: Props) {

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState("");

    const [form, setForm] = useState({
        name: "",
        bio: "",
        occupation: "",
        location: "",
        github: "",
        linkedin: "",
    })

    useEffect(() => {
      async function fetchProfile() {
        
        try {
          
          const response = await getProfile();

          const user = response.user;

          setAvatar(user.avatar || "");

          setForm({
            name: user.name || "",
            bio: user.bio || "",

            occupation: user.occupation || "",
            location: user.location || "",
            github: user.github || "",
            linkedin: user.linledin || "",
          })
        } catch (error) {
          
          console.log(error);
        }
      }

      if (open) {
        fetchProfile();
      }
    }, [open]);
    
if (!open) return null;

  async function handleSave() {
    
    try {
      
      setLoading(true);

      if(file) {

        await uploadAvatar(file);

      }

      await updateProfile(form);

      alert("Profile Updated Successfully");

      onClose();

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Failed to update Profile");

      
    } finally {

      setLoading(false);
    }
  }

  async function handleRemove() {
    try {
      await removeAvatar();

      alert("Avatar removed");

      onClose();

      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-base-100 rounded-xl w-full max-w-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <div className="space-y-4">

          {avatar && (
            <button
            className="btn btn-error btn-sm"
            onClick={handleRemove}
            >
              Remove Avatar
            </button>
          )}

        <input 
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) => {
            if(e.target.files){
              setFile(e.target.files[0]);
            }
          }}
        />

          <input
            className="input input-bordered w-full"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Bio"
            value={form.bio}
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value,
              })
            }
          />

          <input
            className="input input-bordered w-full"
            placeholder="Occupation"
            value={form.occupation}
            onChange={(e) =>
              setForm({
                ...form,
                occupation: e.target.value,
              })
            }
          />

          <input
            className="input input-bordered w-full"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value,
              })
            }
          />

          <input
            className="input input-bordered w-full"
            placeholder="Github"
            value={form.github}
            onChange={(e) =>
              setForm({
                ...form,
                github: e.target.value,
              })
            }
          />

           <input
            className="input input-bordered w-full"
            placeholder="Linkedin"
            value={form.linkedin}
            onChange={(e) =>
              setForm({
                ...form,
                linkedin: e.target.value,
              })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            className="btn btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Edit_Profile;
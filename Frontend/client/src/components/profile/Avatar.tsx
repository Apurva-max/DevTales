import {useState} from "react";

interface Props {
    avatar? : string;
    name: string;
    onChange: (image: string) => void;
}

function Avatar({avatar, name , onChange}: Props) {

    const [preview, setPreview] = useState(avatar);

    function handle_Upload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const image = reader.result as string;

            setPreview(image);

            onChange(image);
        };

        reader.readAsDataURL(file);
    }

    return (

        <div className="flex flex-col items-center gap-4">

            <div className="avatar">

            <div className="w-32 rounded-full ring ring-primary ring-offset-blue-100 ring-offset-2">

                <img src={ preview ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}` } alt="Avatar" />
            </div>
        </div>

        <input type="file" accept="image/*" className="file-input file-input-bordered" onChange={handle_Upload} />

        </div>
    )
}

export default Avatar;
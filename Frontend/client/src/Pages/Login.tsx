import { useState } from "react";
import { useNavigate } from "react-router-dom";
import use_Auth_Store from "../Store/authStore";

function Login() {
    const navigate = useNavigate();

    const login = use_Auth_Store((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
        await login(email, password);

        navigate("/dashboard");

    } catch (error){

        console.log(error);
    }
    }
    return (
    <div className="flex justify-center items-center min-h-[70vh]">
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-3xl font-bold text-center">
                    Login
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" 
                    placeholder="Email" 
                    className="input input-bordered w-full" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />

                    <input 
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn btn-primary w-full" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
    )
};

export default Login;
"use client";

import { FormEventHandler, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Auth(props: any) {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string>();
  const [sign, setSign] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
  });
  const handleClick = () => {
    props.data(false);
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (sign.name === "") {
      const email = sign.email;
      const password = sign.password;
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } else {
      if (sign.password === sign.conformPassword) {
        try {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(sign),
          });
          const data = await res.json();
        

          signIn("credentials", {
            email: sign.email,
            password: sign.password,
            callbackUrl: "/",
          });
          data.status === 201 && router.refresh();
        } catch (error: any) {
          setErr(error);
        }
      } else {
        setErr("Passwords do not match");
      }
    }
  };
  return (
    <div className=" border-fuchsia-400 z-50 px-4 py-4 bg-white border rounded">
      <button className=" float-right text-right" onClick={handleClick}>
        x
      </button>
      <div className={`${open ? " hidden" : "block"}`}>
        <h6 className=" text-2xl  font-semibold">
          Log In
        </h6>
        <button className=" text-blue-500"
          onClick={() => {
            setOpen(true);
          }}
        >or 
          Register
        </button>
        <form className=" flex flex-col">
     
          <input
            className=" shadow-md py-2 pl-1 border-fuchsia-100 border outline-none"
            type="email"
            name="email"
            placeholder=" Email"
            onChange={(e) => setSign({ ...sign, email: e.target.value })}
          />{" "}
         
          <input
            className="  mt-3 shadow-md py-2 pl-1 border-fuchsia-100 border outline-none"
            type="password"
            onChange={(e) => setSign({ ...sign, password: e.target.value })}
            name="password"
               placeholder=" Password"
          />{" "}
          <button
            type="submit"
            className=" shadow-sm border-fuchsia-400 px-3 py-1 mt-5 border"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </form>
       <p className=" text-center">or</p>
        <div
          className=" border-cyan-300 px-3 py-1 text-center border cursor-pointer"
          onClick={() => signIn("google")}
        >
          Sign Up with Google
        </div>
      
       
      </div>
      <div className={`${open ? " block" : "hidden"}`}>
      <h6 className=" text-2xl  font-semibold">
          Register
        </h6>
        <button className=" text-blue-500"
          onClick={() => {
            setOpen(false);
          }}
        >
         or Login
        </button>
        <form className=" flex flex-col">
         
          <input
            className="  mt-3 shadow-md py-2 pl-1 max-w-[206px] rounded border outline-none border-[#6666667a]"
            type="text"
            name="name"
            placeholder="User Name"
            onChange={(e) => setSign({ ...sign, name: e.target.value })}
          />
          
          <input
            className=" mt-3 shadow-md py-2 pl-1 max-w-[206px] rounded border outline-none border-[#6666667a]"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setSign({ ...sign, email: e.target.value })}
          />
          
          <input
            className=" mt-3 shadow-md py-2 pl-1 max-w-[206px] rounded border outline-none border-[#6666667a]"
            type="password"
            name="pass"
            placeholder="Password"
            onChange={(e) => setSign({ ...sign, password: e.target.value })}
          />
          
          <input
            className=" mt-3 shadow-md py-2 pl-1 max-w-[206px] rounded border outline-none border-[#6666667a]"
            type="password"
            name="password"

            onChange={(e) =>
              setSign({ ...sign, conformPassword: e.target.value })
            }
            placeholder="Conform Password"
          />{" "}
          <br />
          <button
            onClick={handleSubmit}
            type="submit"
            className=" hover:bg-blue-500 hover:text-white px-4 py-1 m-auto mt-3 border border-blue-400 rounded"
          >
            Sign Up
          </button>
          {err && <p>{err}</p>}
        </form>
       
      </div>
    </div>
  );
}

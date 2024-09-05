import { ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SignupForm({ onSubmit, onChange }: { onSubmit: (e: FormEvent) => void; onChange: (e: ChangeEvent<HTMLInputElement>) => void; }) {
    return (
      <form onSubmit={onSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <Input name="email" placeholder="Your email" onChange={onChange} />
        <Input name="password" placeholder="Your password" type="password" onChange={onChange} />
        <Input name="confirmPassword" placeholder="Confirm your password" type="password" onChange={onChange} />
        <Input name="firstName" placeholder="Your name" onChange={onChange} />
        <Input name="phonenumber" placeholder="Your phone number" onChange={onChange} />
        <Button type="submit">Sign Up</Button>
      </form>
    );
  }
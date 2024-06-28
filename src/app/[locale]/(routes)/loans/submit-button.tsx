"use client";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton() {
   const { pending } = useFormStatus();
   return (
      <button className="px-4 py-1 text-white rounded bg-green-500" type="submit" disabled={pending}>
         {pending ? "Adding..." : "Add"}
      </button>
   );
}

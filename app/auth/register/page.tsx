import { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./form";

export const metadata: Metadata = {
  title: "Information Registration | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function InfoReg() {
  return (
    <main className="container mx-auto flex flex-1 px-4">
      <div className="m-auto py-4">
        <Card className="mx-auto w-full md:w-3/4">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Disclaimer: This form is hosted on a secure server and can only be
              viewed by the school authority. Please feel confident in filling
              out this form, as all of your information will be kept safe with
              every step of the process. This web application respects
              confidentiality agreement.
            </CardDescription>
          </CardHeader>
          <RegisterForm />
        </Card>
      </div>
    </main>
  );
}

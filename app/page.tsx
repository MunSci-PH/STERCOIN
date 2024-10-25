import { Button } from "./components/ui/button";
import { BookOpen, Shield, Users } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Mockup from "../public/mockup.png";
import Logo from "../public/logo.png";

export default function Home() {
  return (
    <>
      <main className="grow">
        <section className="animate-change-color bg-gradient-to-r from-emerald-600 to-green-600 bg-[length:150%_150%] py-24 text-white md:py-32">
          <div className="container mx-auto px-4 lg:px-24 xl:px-36">
            <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
              <div className="mb-8 flex justify-center md:order-2 md:my-auto md:w-2/3 md:justify-end">
                <div className="relative size-80 drop-shadow-xl transition-all hover:drop-shadow-2xl md:h-52 md:w-96 lg:h-96 lg:w-[60rem]">
                  <Image
                    src={Mockup}
                    alt="STERCOIN Mockup"
                    placeholder="blur"
                    draggable={false}
                    className="hiddenFi my-auto md:block"
                  />
                  <Image
                    src={Logo}
                    alt="STERCOIN Logo"
                    placeholder="blur"
                    draggable={false}
                    className="rounded-full md:hidden"
                  />
                </div>
              </div>
              <div className="my-auto text-center md:order-1 md:w-1/2 md:text-left">
                <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                  Welcome to <span className="font-extrabold">STERCOIN</span>
                </h1>
                <p className="mx-auto mb-8 max-w-lg text-xl md:mx-0 md:text-2xl">
                  Student Emergency Release Contact Information System -
                  Ensuring safety through efficient information management.
                </p>
                <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start">
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/auth/login">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<BookOpen className="size-10 text-primary" />}
                title="Easy Information Access"
                description="Quickly retrieve student emergency contact details when needed."
              />
              <FeatureCard
                icon={<Shield className="size-10 text-primary" />}
                title="Secure Data Storage"
                description="Keep sensitive information safe with our robust security measures."
              />
              <FeatureCard
                icon={<Users className="size-10 text-primary" />}
                title="User-Friendly Interface"
                description="Intuitive design for easy navigation and information management."
              />
            </div>
          </div>
        </section>
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">About STERCOIN</h2>
            <p className="mx-auto max-w-3xl text-xl">
              STERCOIN is a web application designed to store and manage every
              student&apos;s emergency contact information. It provides quick
              and easy access to crucial details in case of disasters or
              emergencies that may occur to MunScians at school.
            </p>
          </div>
        </section>
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              How It Works
            </h2>
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div>
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Input Information
                </h3>
                <p>
                  Easily enter and update student emergency contact details
                  through our secure platform.
                </p>
              </div>
              <div>
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Secure Storage</h3>
                <p>
                  All information is encrypted and stored securely in our
                  state-of-the-art database.
                </p>
              </div>
              <div>
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Quick Access</h3>
                <p>
                  In case of emergency, authorized personnel can quickly
                  retrieve the necessary contact information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

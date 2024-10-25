import { Button } from "./components/ui/button";
import { BookOpen, Shield, Users } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Mockup from "../public/mockup.png";

export default function Home() {
  return (
    <>
      <main className="flex-grow">
        <section className="bg-gradient-to-r animate-change-color bg-[length:150%_150%] from-emerald-600 to-green-600 text-white py-24 md:py-32">
          <div className="container mx-auto px-4 lg:px-24 xl:px-40">
            <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
              <div className="md:order-2 md:w-1/2 flex justify-center md:justify-end mb-8 md:my-auto">
                <div className="relative w-80 h-80 md:w-96 md:h-52 lg:w-[50rem] lg:h-[20rem]">
                  <Image
                    src={Mockup}
                    alt="STERCOIN Mockup"
                    className="rounded-full hidden md:block my-auto"
                  />
                  <Image
                    src="/logo.png"
                    width={400}
                    height={400}
                    alt="STERCOIN Logo"
                    className="rounded-full md:hidden"
                  />
                </div>
              </div>
              <div className="md:order-1 md:w-1/2 text-center md:text-left my-auto">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Welcome to <span className="font-extrabold">STERCOIN</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-lg mx-auto md:mx-0">
                  Student Emergency Release Contact Information System -
                  Ensuring safety through efficient information management.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/auth/login">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Easy Information Access"
                description="Quickly retrieve student emergency contact details when needed."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Secure Data Storage"
                description="Keep sensitive information safe with our robust security measures."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="User-Friendly Interface"
                description="Intuitive design for easy navigation and information management."
              />
            </div>
          </div>
        </section>
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">About STERCOIN</h2>
            <p className="text-xl max-w-3xl mx-auto">
              STERCOIN is a web application designed to store and manage every
              student's emergency contact information. It provides quick and
              easy access to crucial details in case of disasters or emergencies
              that may occur to MunScians at school.
            </p>
          </div>
        </section>
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Input Information
                </h3>
                <p>
                  Easily enter and update student emergency contact details
                  through our secure platform.
                </p>
              </div>
              <div>
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
                <p>
                  All information is encrypted and stored securely in our
                  state-of-the-art database.
                </p>
              </div>
              <div>
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Access</h3>
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
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

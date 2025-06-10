"use client";

import { Button } from "@/components/ui/button";
import { BarChart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';
import { Layout, Calendar } from "lucide-react";
import React from "react";
import { Card,CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Intuitive Dashboard",
    description: "Get a clear overview of your projects, sprints, and tasks with our easy-to-use dashboard.",
    icon: Layout,
  },
  {
    title: "Sprint Planning",
    description: "Effortlessly schedule and manage your sprints with an integrated calendar and timeline view.",
    icon: Calendar,
  },
  {
    title: "Progress Tracking",
    description: "Visualize team progress and productivity using dynamic charts and performance metrics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/*Hero Section*/} 
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col font-extrabold bg-gradient-to-br from-blue-500 via-blue-100 to from-blue-400 bg-clip-text
          tracking-tighter text-transparent pr-2 pb-2;">Streamline Your Workflow<br/>
          <span className="flex justify-center">
  With&nbsp;
  <TypeAnimation
    sequence={[
      'Agilix...',
      1000,
      '',
      500,
    ]}
    wrapper="span"
    cursor={true}
    repeat={Infinity}
  />
</span>
        </h1>
        <p  className="text-greay-300 mb-10 max-w-3xl mx-auto">
          Agilix is a project management tool designed for developers, helping you to manage your projects efficiently and effectively.
        </p>
        <Link href="/onboarding">
          <Button size="lg" className={"mr-4"}>
            Get Started
            <ChevronRight size={18} className="ml-1"/>
          </Button>
        </Link>
        <Link href="#features" >
          <Button size="lg" variant="outline" className="mr-4">
            Learn More
            
          </Button>
        </Link>
      </section>

      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return(
              <Card key={index} className="bg-gray-800 hover:bg-gray-600">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-300"/>
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
          
          
        </div>
        </div>
      </section>
    </div>
  );
}

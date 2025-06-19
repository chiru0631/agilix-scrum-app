// Hero.jsx
"use client"; // Required because of TypeAnimation and interactive components

import React from "react";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="container mx-auto py-20 text-center">
      <h1
        className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col font-extrabold 
                   bg-gradient-to-br from-blue-500 via-blue-100 to from-blue-400 bg-clip-text
                   tracking-tighter text-transparent pr-2 pb-2"
      >
        Streamline Your Workflow
        <br />
        <span className="flex justify-center">
          With&nbsp;
          <TypeAnimation
            sequence={["Agilix...", 1000, "", 500]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </span>
      </h1>
      <p className="text-gray-300 pt-12 mb-18 max-w-3xl mx-auto">
        Agilix is a project management tool designed for developers, helping you
        to manage your projects efficiently and effectively.
      </p>
      <Link href="/onboarding">
        <Button size="lg" className={"mr-4 mt-15"}>
          Get Started
          <ChevronRight size={18} className="ml-1" />
        </Button>
      </Link>
      <Link href="#features">
        <Button size="lg" variant="outline" className="mr-4">
          Learn More
        </Button>
      </Link>
    </section>
  );
}

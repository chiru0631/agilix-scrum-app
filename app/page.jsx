import { ArrowRight, BarChart, ChevronRight } from "lucide-react";
import Hero from "@/components/hero";
import CompanyCarousel from "@/components/company-carousel";
import { Layout, Calendar } from "lucide-react";
import React from "react";
import { Card,CardContent } from "@/components/ui/card";
import faqs from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

      <section className="container mx-auto py-20 text-center">
        <Hero />
      </section>

      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return(
              <Card key={index} className="bg-gray-800 shine-effect hover:bg-gray-700 transition-colors duration-300">
              <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
          
          
        </div>
        </div>
      </section>

      <section className="py=20">
        <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-12 mt-12 text-center">Trused by Industry Leaders</h3>
        <CompanyCarousel/>
        </div>
      </section>

      <section className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-12 mt-12 text-center">Frequently Asked Questions </h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq,index)=>(
            <AccordionItem key={index} value={`item-${index}`}>

    <AccordionTrigger>{faq.question}</AccordionTrigger>
    <AccordionContent>
      {faq.answer}
    </AccordionContent>
  </AccordionItem>
          ))}
  
</Accordion>
        </div>
      </section>

      <section className="py=20 text-center px-5">
        <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-8 mt-12 text-center">Ready to take your project management to the next level?</h3>
        
        <p className="text-xl mb-12">
          Join thousands of developers who trust Agilix for their project management needs.
        </p>
        <Link href={"/onboarding"}>
          <Button size="lg" className="animate-bounce">
            Start For Free <ArrowRight className="ml-2 h-5 w-5"/>
          </Button>
        </Link>
        </div>
      </section>
      
    </div>
  );
}

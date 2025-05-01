"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director at TechFlow",
    image:
      "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=300",
    text: "Zyply transformed how we track our campaign performance. The real-time analytics have helped us optimize our marketing strategies instantly, leading to a 43% increase in click-through rates.",
  },
  {
    name: "Michael Chen",
    role: "Growth Lead at StartupXYZ",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
    text: "The ability to customize short links and track analytics in real-time has been game-changing for our growth team. We can now make data-driven decisions faster than ever before.",
  },
  {
    name: "Jessica Williams",
    role: "E-commerce Specialist",
    image:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300",
    text: "Password-protected links and expiration features have added an extra layer of security to our product launches. Zyply has become an essential tool in our marketing stack.",
  },
  {
    name: "David Rodriguez",
    role: "Digital Strategist",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
    text: "The QR code generation feature has helped us bridge our offline and online marketing efforts seamlessly. Our event engagement has increased by 35% since using Zyply.",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-background py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of satisfied users who have transformed their link
            management strategy with Zyply.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="relative mx-auto max-w-4xl px-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-0 z-10 -translate-y-1/2"
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-card/50 border backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <Quote className="text-primary/50 mb-2 h-8 w-8" />
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-lg italic">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center gap-4 pt-2">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-0 z-10 -translate-y-1/2"
            onClick={next}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next testimonial</span>
          </Button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`h-3 w-3 rounded-full p-0 ${
                  current === index ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => setCurrent(index)}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

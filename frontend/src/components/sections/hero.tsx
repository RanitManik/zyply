"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20">
      {/* Decorative elements */}
      <motion.div
        className="bg-primary/10 absolute top-1/4 right-0 h-72 w-72 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="bg-chart-1/10 absolute bottom-1/4 left-0 h-96 w-96 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-12 text-center">
          <motion.div
            className="mx-auto max-w-3xl space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Shorten Smart.{" "}
              <span className="text-primary inline-block">Analyze Better.</span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              Zyply lets you shorten URLs, track every click, and unlock
              insights — all in real time.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
              <Button size="lg" onClick={() => scrollToSection("pricing")}>
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card/30 overflow-hidden rounded-xl border p-6 shadow-xl backdrop-blur-lg md:p-8 lg:p-10">
              <div className="mockup-browser-ui w-full">
                <div className="bg-background/60 flex items-center rounded-t-lg border-b px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-4 flex-1">
                    <div className="bg-muted/60 text-muted-foreground flex h-7 items-center overflow-hidden rounded-full px-3 text-xs">
                      app.zyply.com/dashboard
                    </div>
                  </div>
                </div>
                <div className="bg-background/50 rounded-b-lg p-4">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="bg-muted/40 col-span-3 h-64 rounded-lg p-3"></div>
                    <div className="col-span-9 space-y-4">
                      <div className="bg-muted/40 h-12 rounded-lg"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-chart-1/30 h-24 rounded-lg p-4"></div>
                        <div className="bg-chart-2/30 h-24 rounded-lg p-4"></div>
                        <div className="bg-chart-3/30 h-24 rounded-lg p-4"></div>
                      </div>
                      <div className="bg-muted/40 h-32 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated elements over the mockup */}
            <motion.div
              className="bg-primary/20 absolute top-1/2 left-1/4 h-8 w-40 rounded-full blur-sm"
              animate={{
                x: [0, 20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="bg-chart-2/40 absolute right-1/4 bottom-1/3 h-12 w-12 rounded-full blur-sm"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Link href="#features">
              <Button
                variant="ghost"
                size="icon"
                className="bg-card/30 h-10 w-10 rounded-full backdrop-blur-sm"
              >
                <ChevronDown className="h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

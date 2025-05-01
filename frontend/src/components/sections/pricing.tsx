"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = {
  monthly: [
    {
      name: "Basic",
      price: "$9",
      description: "Essential features for small teams and individuals.",
      features: [
        "Up to 5,000 shortened URLs",
        "Basic analytics",
        "URL expiration",
        "24-hour support",
        "Custom branded domains",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Advanced features for growing businesses.",
      features: [
        "Up to 50,000 shortened URLs",
        "Advanced analytics & reports",
        "Password protected links",
        "Priority support",
        "API access",
        "Unlimited branded domains",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Business",
      price: "$49",
      description: "Enterprise-grade features for large organizations.",
      features: [
        "Unlimited shortened URLs",
        "Real-time analytics",
        "Advanced security",
        "Dedicated account manager",
        "Full API access",
        "SSO & team management",
        "Service Level Agreement",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ],
  yearly: [
    {
      name: "Basic",
      price: "$90",
      period: "$7.5/mo",
      description: "Essential features for small teams and individuals.",
      features: [
        "Up to 5,000 shortened URLs",
        "Basic analytics",
        "URL expiration",
        "24-hour support",
        "Custom branded domains",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$180",
      period: "$15/mo",
      description: "Advanced features for growing businesses.",
      features: [
        "Up to 50,000 shortened URLs",
        "Advanced analytics & reports",
        "Password protected links",
        "Priority support",
        "API access",
        "Unlimited branded domains",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Business",
      price: "$490",
      period: "$40.8/mo",
      description: "Enterprise-grade features for large organizations.",
      features: [
        "Unlimited shortened URLs",
        "Real-time analytics",
        "Advanced security",
        "Dedicated account manager",
        "Full API access",
        "SSO & team management",
        "Service Level Agreement",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ],
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="pricing" className="bg-muted/30 py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Pricing Plans for Every Need
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the perfect plan for your team. Start with our free trial and
            upgrade anytime.
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="monthly" className="mx-auto max-w-md">
              <TabsList className="mb-8 grid grid-cols-2">
                <TabsTrigger
                  value="monthly"
                  onClick={() => setBillingPeriod("monthly")}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  onClick={() => setBillingPeriod("yearly")}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Yearly{" "}
                  <span className="ml-1 text-xs opacity-80">Save 20%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {plans[billingPeriod as keyof typeof plans].map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={`flex h-full flex-col ${
                  plan.popular
                    ? "border-primary bg-card/60 relative scale-105 shadow-lg backdrop-blur-sm md:scale-110"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 right-0 left-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">
                      {billingPeriod === "monthly" ? "/month" : "/year"}
                    </span>
                    {plan.period && (
                      <p className="text-muted-foreground mt-1 text-sm">
                        {plan.period}
                      </p>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

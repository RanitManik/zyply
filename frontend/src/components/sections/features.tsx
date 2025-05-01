"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Bell,
  Calendar,
  Globe,
  Lock,
  QrCode,
  Share2,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "Click Intent Analytics",
    description:
      "Understand visitor behavior with advanced analytics. Track referrers, devices, locations and more to optimize your marketing strategies.",
    icon: BarChart3,
    color: "bg-chart-1/20",
    borderColor: "border-chart-1/30",
    details: [
      "Real-time click tracking",
      "Visitor demographics",
      "Device analytics",
      "Geographic insights",
    ],
  },
  {
    title: "Smart Expiry & Redirect",
    description:
      "Set URLs to expire automatically or redirect to different destinations based on time, geography, or number of clicks.",
    icon: Calendar,
    color: "bg-chart-2/20",
    borderColor: "border-chart-2/30",
    details: [
      "Time-based expiration",
      "Click limit controls",
      "Geographic routing",
      "Custom redirect rules",
    ],
  },
  {
    title: "Real-Time Notifications",
    description:
      "Get instant alerts when important links are clicked. Set thresholds for high-traffic alerts or unusual activity warnings.",
    icon: Bell,
    color: "bg-chart-3/20",
    borderColor: "border-chart-3/30",
    details: [
      "Instant click alerts",
      "Traffic spike warnings",
      "Custom thresholds",
      "Email notifications",
    ],
  },
  {
    title: "Advanced Security",
    description:
      "Protect your links with enterprise-grade security features including password protection and access controls.",
    icon: Lock,
    color: "bg-chart-4/20",
    borderColor: "border-chart-4/30",
    details: [
      "Password protection",
      "Access logging",
      "IP whitelisting",
      "SSL encryption",
    ],
  },
  {
    title: "QR Code Generation",
    description:
      "Generate custom QR codes for your shortened URLs with branded colors and logos for seamless offline-to-online experiences.",
    icon: QrCode,
    color: "bg-chart-5/20",
    borderColor: "border-chart-5/30",
    details: [
      "Custom QR designs",
      "Logo integration",
      "Color customization",
      "High-res export",
    ],
  },
  {
    title: "Global CDN",
    description:
      "Lightning-fast redirects powered by our global CDN network ensuring minimal latency for users worldwide.",
    icon: Globe,
    color: "bg-chart-1/20",
    borderColor: "border-chart-1/30",
    details: [
      "Global edge network",
      "99.9% uptime",
      "Auto-scaling",
      "DDoS protection",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section
      id="features"
      className="bg-muted/30 relative overflow-hidden py-24"
    >
      {/* Decorative elements */}
      <div className="bg-primary/5 absolute top-0 right-0 h-1/3 w-1/3 rounded-full blur-3xl" />
      <div className="bg-chart-2/5 absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="from-primary to-chart-1 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Everything you need to create, manage, and analyze your shortened
              URLs efficiently.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={childVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() =>
                setSelectedFeature(selectedFeature === index ? null : index)
              }
            >
              <Card
                className={`h-full cursor-pointer border-t-4 transition-all duration-300 hover:shadow-lg ${selectedFeature === index ? "ring-primary ring-2" : ""}`}
              >
                <CardHeader>
                  <div
                    className={`h-12 w-12 rounded-lg ${feature.color} ${feature.borderColor} mb-4 flex items-center justify-center border`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-base">
                    {feature.description}
                  </CardDescription>
                  <AnimatePresence>
                    {selectedFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul className="mt-4 space-y-2">
                          {feature.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-muted-foreground flex items-center text-sm"
                            >
                              <Zap className="text-primary mr-2 h-4 w-4" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-4 w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add your learn more action here
                          }}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Learn More
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

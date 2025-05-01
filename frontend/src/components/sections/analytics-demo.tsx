"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Clock,
  Globe,
  Laptop,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const dailyClickData = [
  { date: "Mon", clicks: 2340, uniqueVisitors: 1420 },
  { date: "Tue", clicks: 3463, uniqueVisitors: 2210 },
  { date: "Wed", clicks: 2835, uniqueVisitors: 1850 },
  { date: "Thu", clicks: 3692, uniqueVisitors: 2400 },
  { date: "Fri", clicks: 4120, uniqueVisitors: 2800 },
  { date: "Sat", clicks: 3257, uniqueVisitors: 2100 },
  { date: "Sun", clicks: 2845, uniqueVisitors: 1950 },
];

const weeklyData = [
  { week: "Week 1", clicks: 15420, uniqueVisitors: 9800 },
  { week: "Week 2", clicks: 18650, uniqueVisitors: 12400 },
  { week: "Week 3", clicks: 16980, uniqueVisitors: 11200 },
  { week: "Week 4", clicks: 21340, uniqueVisitors: 14500 },
];

const monthlyData = [
  { month: "Jan", clicks: 54200, uniqueVisitors: 32500 },
  { month: "Feb", clicks: 48700, uniqueVisitors: 29800 },
  { month: "Mar", clicks: 61500, uniqueVisitors: 38200 },
  { month: "Apr", clicks: 72300, uniqueVisitors: 45600 },
  { month: "May", clicks: 68400, uniqueVisitors: 42100 },
  { month: "Jun", clicks: 78900, uniqueVisitors: 49300 },
];

const trafficSourceData = [
  { source: "Direct", value: 40, color: "hsl(var(--chart-1))" },
  { source: "Social", value: 25, color: "hsl(var(--chart-2))" },
  { source: "Email", value: 15, color: "hsl(var(--chart-3))" },
  { source: "Referral", value: 12, color: "hsl(var(--chart-4))" },
  { source: "Other", value: 8, color: "hsl(var(--chart-5))" },
];

const geoData = [
  { country: "United States", value: 42 },
  { country: "United Kingdom", value: 18 },
  { country: "Germany", value: 12 },
  { country: "Canada", value: 10 },
  { country: "Australia", value: 8 },
  { country: "Other", value: 10 },
];

const deviceData = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 7 },
];

const topPerformingUrls = [
  { url: "example.com/promo", clicks: 4582, conversion: 8.7 },
  { url: "example.com/sale", clicks: 3241, conversion: 6.2 },
  { url: "example.com/blog", clicks: 2876, conversion: 5.4 },
  { url: "example.com/product", clicks: 2154, conversion: 4.1 },
];

const conversionData = [
  { hour: "00:00", conversion: 2.1 },
  { hour: "04:00", conversion: 1.8 },
  { hour: "08:00", conversion: 4.5 },
  { hour: "12:00", conversion: 7.2 },
  { hour: "16:00", conversion: 6.8 },
  { hour: "20:00", conversion: 4.2 },
];

const engagementData = [
  { name: "0-10s", value: 35 },
  { name: "10-30s", value: 25 },
  { name: "30-60s", value: 20 },
  { name: "1-3m", value: 15 },
  { name: "3m+", value: 5 },
];

export function AnalyticsDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-background relative overflow-hidden py-12">
      {/* Decorative elements */}
      <div className="bg-primary/5 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="bg-chart-2/5 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl" />

      <div className="relative container px-4 md:px-6">
        <div className="mb-10 text-center">
          <motion.h2
            className="from-primary to-chart-2 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Advanced Analytics Dashboard
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Comprehensive insights to optimize your URL performance and drive
            better results
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* KPI Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            <Card className="bg-card/50 border backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Clicks
                </CardTitle>
                <TrendingUp className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">267,492</div>
                <p className="text-muted-foreground mt-1 text-xs">
                  <span className="font-medium text-green-500">+12.4%</span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Links
                </CardTitle>
                <Activity className="text-chart-2 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-muted-foreground mt-1 text-xs">
                  <span className="font-medium text-green-500">+7.2%</span> from
                  last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <ArrowUpRight className="text-chart-3 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.8%</div>
                <p className="text-muted-foreground mt-1 text-xs">
                  <span className="font-medium text-green-500">+1.2%</span> from
                  last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Unique Visitors
                </CardTitle>
                <Users className="text-chart-4 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142,857</div>
                <p className="text-muted-foreground mt-1 text-xs">
                  <span className="font-medium text-green-500">+9.3%</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Charts Section */}
          <motion.div variants={itemVariants}>
            <Card className="border">
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>
                  Clicks and unique visitors over time
                </CardDescription>
                <Tabs defaultValue="daily" className="w-full">
                  <TabsList className="grid w-full max-w-xs grid-cols-3">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="daily" className="mt-4 h-[350px]">
                    <ChartContainer
                      config={{
                        clicks: {
                          label: "Clicks",
                          color: "hsl(var(--chart-1))",
                        },
                        uniqueVisitors: {
                          label: "Unique Visitors",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyClickData}>
                          <defs>
                            <linearGradient
                              id="colorClicks"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorVisitors"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-2))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-2))"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="date"
                            stroke="var(--muted-foreground)"
                          />
                          <YAxis stroke="var(--muted-foreground)" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="clicks"
                            stroke="hsl(var(--chart-1))"
                            fillOpacity={1}
                            fill="url(#colorClicks)"
                            strokeWidth={2}
                          />
                          <Area
                            type="monotone"
                            dataKey="uniqueVisitors"
                            stroke="hsl(var(--chart-2))"
                            fillOpacity={1}
                            fill="url(#colorVisitors)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </TabsContent>
                  <TabsContent value="weekly" className="mt-4 h-[350px]">
                    <ChartContainer
                      config={{
                        clicks: {
                          label: "Clicks",
                          color: "hsl(var(--chart-1))",
                        },
                        uniqueVisitors: {
                          label: "Unique Visitors",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyData}>
                          <defs>
                            <linearGradient
                              id="colorClicks"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorVisitors"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-2))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-2))"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="week"
                            stroke="var(--muted-foreground)"
                          />
                          <YAxis stroke="var(--muted-foreground)" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="clicks"
                            stroke="hsl(var(--chart-1))"
                            fillOpacity={1}
                            fill="url(#colorClicks)"
                            strokeWidth={2}
                          />
                          <Area
                            type="monotone"
                            dataKey="uniqueVisitors"
                            stroke="hsl(var(--chart-2))"
                            fillOpacity={1}
                            fill="url(#colorVisitors)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </TabsContent>
                  <TabsContent value="monthly" className="mt-4 h-[350px]">
                    <ChartContainer
                      config={{
                        clicks: {
                          label: "Clicks",
                          color: "hsl(var(--chart-1))",
                        },
                        uniqueVisitors: {
                          label: "Unique Visitors",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData}>
                          <defs>
                            <linearGradient
                              id="colorClicks"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorVisitors"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-2))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-2))"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="month"
                            stroke="var(--muted-foreground)"
                          />
                          <YAxis stroke="var(--muted-foreground)" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="clicks"
                            stroke="hsl(var(--chart-1))"
                            fillOpacity={1}
                            fill="url(#colorClicks)"
                            strokeWidth={2}
                          />
                          <Area
                            type="monotone"
                            dataKey="uniqueVisitors"
                            stroke="hsl(var(--chart-2))"
                            fillOpacity={1}
                            fill="url(#colorVisitors)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Bento Grid - First Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Traffic Sources */}
            <Card className="border md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    value: { label: "Traffic", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {trafficSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card className="border md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    value: { label: "Visitors", color: "hsl(var(--chart-2))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={geoData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis type="number" stroke="var(--muted-foreground)" />
                      <YAxis
                        dataKey="country"
                        type="category"
                        stroke="var(--muted-foreground)"
                        width={100}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--chart-2))"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card className="border md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Laptop className="h-5 w-5" />
                  Device Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Percentage",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="20%"
                      outerRadius="80%"
                      barSize={20}
                      data={deviceData}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                        label={{
                          position: "insideStart",
                          fill: "var(--foreground)",
                          formatter: (value, entry) => {
                            // Check if entry and entry.payload exist before accessing properties
                            if (entry && entry.payload && entry.payload.name) {
                              return `${entry.payload.name} ${value}%`;
                            }
                            // Return just the value if name is not available
                            return `${value}%`;
                          },
                        }}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0
                                ? "hsl(var(--chart-3))"
                                : index === 1
                                  ? "hsl(var(--chart-4))"
                                  : "hsl(var(--chart-5))"
                            }
                          />
                        ))}
                      </RadialBar>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter className="text-muted-foreground flex justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Laptop className="h-3 w-3" /> Desktop
                </div>
                <div className="flex items-center gap-1">
                  <Smartphone className="h-3 w-3" /> Mobile
                </div>
                <div className="flex items-center gap-1">
                  <Tablet className="h-3 w-3" /> Tablet
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Bento Grid - Second Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Top Performing URLs */}
            <Card className="border md:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Performing URLs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingUrls.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                          <span className="text-primary text-xs font-medium">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.url}</p>
                          <p className="text-muted-foreground text-xs">
                            {item.clicks.toLocaleString()} clicks
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-green-500">
                        {item.conversion}%
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All URLs
                </Button>
              </CardFooter>
            </Card>

            {/* Conversion by Time */}
            <Card className="border md:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Conversion by Time
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ChartContainer
                  config={{
                    conversion: {
                      label: "Conversion Rate",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={conversionData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        vertical={false}
                      />
                      <XAxis dataKey="hour" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="conversion"
                        stroke="hsl(var(--chart-4))"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "hsl(var(--chart-4))" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter className="text-muted-foreground text-xs">
                Peak conversion rate at 12:00 (7.2%)
              </CardFooter>
            </Card>

            {/* Engagement Duration */}
            <Card className="border md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Engagement Duration
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ChartContainer
                  config={{
                    value: { label: "Visitors", color: "hsl(var(--chart-5))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={engagementData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        vertical={false}
                      />
                      <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--chart-5))"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter className="text-muted-foreground text-xs">
                35% of visitors spend less than 10 seconds on your links
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

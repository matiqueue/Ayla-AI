"use client";

import type * as React from "react";
import { motion } from "framer-motion";
import { Home, Cpu, MessageCircle, Brain, Settings, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface MenuItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    gradient: string;
    iconColor: string;
}

const menuItems: MenuItem[] = [
    {
        icon:      <Home className="h-5 w-5 group-hover:text-green-500 transition-colors duration-300" />,
        label:     "Home",
        href:      "/pages/home",
        gradient:  "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
        iconColor: "text-green-500",
    },
    {
        icon:      <Cpu className="h-5 w-5 group-hover:text-red-500 transition-colors duration-300" />,
        label:     "Models",
        href:      "/pages/models",
        gradient:  "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
        iconColor: "text-red-500",
    },
    {
        icon:      <MessageCircle className="h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />,
        label:     "Conversations",
        href:      "/pages/conversations",
        gradient:  "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
        iconColor: "text-blue-500",
    },
    {
        icon:      <Brain className="h-5 w-5 group-hover:text-orange-500 transition-colors duration-300" />,
        label:     "AI Insights",
        href:      "/pages/ai-insights",
        gradient:  "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
        iconColor: "text-orange-500",
    },
    {
        icon:      <Settings className="h-5 w-5 group-hover:text-gray-400 transition-colors duration-300" />,
        label:     "Settings",
        href:      "/pages/settings",
        gradient:  "radial-gradient(circle, rgba(192,192,192,0.2) 0%, rgba(169,169,169,0.08) 50%, rgba(128,128,128,0) 100%)",
        iconColor: "text-gray-400",
    },
    {
        icon:      <User className="h-5 w-5 group-hover:text-purple-500 transition-colors duration-300" />,
        label:     "Profile",
        href:      "/pages/profile",
        gradient:  "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(139,92,246,0.08) 50%, rgba(124,58,237,0) 100%)",
        iconColor: "text-purple-500",
    },
];

const itemVariants = {
    initial: { rotateX: 0, opacity: 1 },
    hover:   { rotateX: -90, opacity: 0 },
};

const backVariants = {
    initial: { rotateX: 90, opacity: 0 },
    hover:   { rotateX: 0, opacity: 1 },
};

const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
        opacity: 1,
        scale:   2,
        transition: {
            opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            scale:   { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
        },
    },
};

const navGlowVariants = {
    initial: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease:     [0.4, 0, 0.2, 1],
        },
    },
};

const sharedTransition = {
    type:      "spring",
    stiffness: 100,
    damping:   20,
    duration:  0.5,
};

export function MenuBar() {
    const { theme } = useTheme();

    const isDarkTheme = theme === "dark";

    return (
        <motion.nav
            className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
            initial="initial"
            whileHover="hover"
        >
            <motion.div
                className={`absolute -inset-2 bg-gradient-radial from-transparent ${
                    isDarkTheme
                        ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
                        : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
                } to-transparent rounded-3xl z-0 pointer-events-none`}
                variants={navGlowVariants}
            />
            <ul className="flex items-center gap-2 relative z-10">
                {menuItems.map((item, index) => (
                    <motion.li key={item.label} className="relative">
                        <motion.div
                            className="block rounded-xl overflow-visible group relative"
                            style={{ perspective: "600px" }}
                            whileHover="hover"
                            initial="initial"
                        >
                            <motion.div
                                className="absolute inset-0 z-0 pointer-events-none"
                                variants={glowVariants}
                                style={{
                                    background:   item.gradient,
                                    opacity:      0,
                                    borderRadius: "16px",
                                }}
                            />
                            <motion.div
                                className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                                variants={itemVariants}
                                transition={sharedTransition}
                                style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                            >
                                <Link href={item.href} className="flex items-center gap-2">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                                variants={backVariants}
                                transition={sharedTransition}
                                style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                            >
                                <Link href={item.href} className="flex items-center gap-2">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.li>
                ))}
            </ul>
        </motion.nav>
    );
}

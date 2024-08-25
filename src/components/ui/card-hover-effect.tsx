import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { CardFooter } from "./card";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    name: string;
    title: string; // assuming the title now holds the image URL
    description: string;
    specialization: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-6",
        className
      )}
    >
      {items.map((item, idx) => {
        const Wrapper = item.link.length > 0 ? Link : "div";

        return (
          <Wrapper
            key={idx}
            href={item.link}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-[rgb(103,143,134)]/[0.8] block rounded-3xl shadow-lg"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card className="border-2 px-2 border-[rgb(103, 143, 134)]">
              <CardImage src={item.title} alt="Image" />
              <CardName>{item.name}</CardName>
              <CardDescription className="flex flex-row underline my-5">
                Specialization: {item.specialization}
              </CardDescription>
              <CardFooter>{item.description}</CardFooter>
            </Card>
          </Wrapper>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full max-w-screen-sm overflow-hidden bg-white border border-transparent relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("w-full h-48 object-cover rounded-xl", className)}
    />
  );
};

export const CardName = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3
      className={cn("mt-4 text-lg font-semibold text-gray-800", className)}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn("mt-2 tracking-wide leading-relaxed text-sm", className)}
    >
      {children}
    </p>
  );
};

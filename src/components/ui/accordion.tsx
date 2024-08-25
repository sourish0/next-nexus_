"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />

))
AccordionItem.displayName = "AccordionItem"
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex flex-1 items-center justify-between pt-2 font-medium transition-all">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "pl-5 flex flex-1 data-[state=open]:text-white data-[state=closed]:text-black items-center justify-between py-2 font-medium transition-all data-[state=open]:bg-green-500 [&[data-state=open]>svg]:rotate-45",
        className
      )}
      {...props}
    >
      {children}
      <Plus size={30} className=" w-4 shrink-0 transition-all duration-200 mr-5 my-0" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="text-sm transition-all data-[state=open]:bg-slate-300  data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("py-1 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
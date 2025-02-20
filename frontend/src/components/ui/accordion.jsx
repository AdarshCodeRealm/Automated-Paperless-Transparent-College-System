    import * as React from "react";
    import * as AccordionPrimitive from "@radix-ui/react-accordion";
    import { cn } from "@/lib/utils";

    const Accordion = AccordionPrimitive.Root;

    const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b", className)}
        {...props}
    />
    ));
    AccordionItem.displayName = "AccordionItem";

    const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
        ref={ref}
        className={cn("flex flex-1 items-center justify-between py-2 text-left font-medium transition-all hover:underline", className)}
        {...props}
        >
        {children}
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
    ));
    AccordionTrigger.displayName = "AccordionTrigger";

    const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn("overflow-hidden text-sm transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp", className)}
        {...props}
    >
        <div className="p-4">{children}</div>
    </AccordionPrimitive.Content>
    ));
    AccordionContent.displayName = "AccordionContent";

    export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

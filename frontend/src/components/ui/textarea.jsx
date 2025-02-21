    import * as React from "react";
    import { Slot } from "@radix-ui/react-slot";
    import { cva } from "class-variance-authority";

    import { cn } from "@/lib/utils";

    const textareaVariants = cva(
    "resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
        size: {
            default: "h-9", // Adjust default height as needed
            sm: "h-8",
            lg: "h-12", // Or adjust as needed
        },
        },
        defaultVariants: {
        size: "default",
        },
    }
    );

    const Textarea = React.forwardRef(
    ({ className, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "textarea";
        return (
        <Comp
            className={cn(textareaVariants({ size, className }))}
            ref={ref}
            {...props}
        />
        );
    }
    );

    Textarea.displayName = "Textarea";

    export { Textarea, textareaVariants };
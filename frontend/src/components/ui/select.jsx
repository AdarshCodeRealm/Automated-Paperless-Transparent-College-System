    import * as React from "react";
    import { Slot } from "@radix-ui/react-slot";
    import { cva } from "class-variance-authority";

    import { cn } from "@/lib/utils";

    const selectVariants = cva(
    "relative inline-flex w-full items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
        size: {
            default: "h-9",
            sm: "h-8",
            lg: "h-10",
        },
        },
        defaultVariants: {
        size: "default",
        },
    }
    );


    const Select = React.forwardRef(
    ({ className, size, asChild = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "div"; // Use a div for the outer container

        return (
        <Comp
            className={cn(selectVariants({ size, className }))}
            ref={ref}
            {...props}
        >
            {children} {/* Render the Select components (Trigger, Content, Item, etc.) */}
        </Comp>
        );
    }
    );

    Select.displayName = "Select";

    // These are the individual Select parts you'll use *inside* the <Select> component:
    const SelectTrigger = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"; // Use a button for the trigger
    return <Comp className={cn("inline-flex items-center justify-between w-full", className)} ref={ref} {...props} />;
    });

    SelectTrigger.displayName = "SelectTrigger";

    const SelectContent = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"; // Use a div for the content/dropdown
    return <Comp className={cn("absolute z-10 w-full rounded-md border border-input bg-background shadow-md", className)} ref={ref} {...props} />;
    });

    SelectContent.displayName = "SelectContent";

    const SelectItem = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"; // Or a button if you want item clicks to submit a form
    return <Comp className={cn("px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer", className)} ref={ref} {...props} />;
    });

    SelectItem.displayName = "SelectItem";

    const SelectValue = ({ className, children, ...props }) => (
    <span className={cn("truncate", className)} {...props}>{children}</span>
    );

    SelectValue.displayName = "SelectValue";

    const SelectGroup = React.forwardRef(({ className, asChild = false, children, label, ...props }, ref) => {
        const Comp = asChild ? Slot : "div";
        
            return (
            <Comp className={cn("mb-4", className)} ref={ref} {...props}> {/* Added margin-bottom */}
                {label && <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>} {/* Added label */}
                {children}
            </Comp>
            );
        });
        SelectGroup.displayName = "SelectGroup";   
        
        
    const SelectLabel = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "label"; // Use a label element
        
        return (
            <Comp className={cn("text-sm font-medium text-muted-foreground", className)} ref={ref} {...props} />
        );
        });
        
        SelectLabel.displayName = "SelectLabel";

    export { Select, SelectGroup,SelectTrigger, SelectContent, SelectItem, SelectValue,SelectLabel, selectVariants };
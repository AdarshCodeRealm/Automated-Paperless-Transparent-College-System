    import * as React from "react";
    import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Your import path
    import { cn } from "@/lib/utils"; // Your utility function for class merging

    const StyledRadioGroup = React.forwardRef(
    ({ className, ...props }, ref) => {
        return (
        <RadioGroup
            className={cn("flex flex-col gap-2", className)} // Base styles for the group
            ref={ref}
            {...props}
        />
        );
    }
    );

    StyledRadioGroup.displayName = "StyledRadioGroup";


    const StyledRadioGroupItem = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        return (
        <RadioGroupItem
            className={cn(
            "relative inline-flex items-center rounded-md border border-input px-3 py-2 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-ring", // Base item styles
            props.checked && "bg-primary text-primary-foreground border-primary", // Checked styles
            className // Any additional classes
            )}
            ref={ref}
            {...props}
        >
            <span className="relative z-10">{children}</span> {/* Ensure text is above indicator */}
            <span className={cn(
            "absolute inset-y-0 right-0 w-8 h-full flex items-center justify-center transition-opacity",
            !props.checked && "opacity-0" // Hide indicator when not checked
            )}>
            <span className="w-3 h-3 rounded-full bg-primary" /> {/* Custom indicator */}
            </span>
        </RadioGroupItem>
        );
    }
    );

    StyledRadioGroupItem.displayName = "StyledRadioGroupItem";

    export { StyledRadioGroup, StyledRadioGroupItem };
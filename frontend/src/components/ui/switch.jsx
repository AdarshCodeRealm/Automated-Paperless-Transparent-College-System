    import * as React from "react";
    import { Switch } from "@/components/ui/switch"; // Your import path
    import { cn } from "@/lib/utils"; // Your utility function for class merging

    const StyledSwitch = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <Switch
        className={cn(
            "relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring", // Base styles
            props.checked ? "bg-primary" : "bg-input", // Checked/Unchecked background
            className // Additional classes
        )}
        ref={ref}
        {...props}
        >
        <span
            className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-lg transform translate-x-0 transition-transform", // Base thumb styles
            props.checked && "translate-x-full" // Checked thumb position
            )}
        />
        </Switch>
    );
    });

    StyledSwitch.displayName = "StyledSwitch";

    export { StyledSwitch };
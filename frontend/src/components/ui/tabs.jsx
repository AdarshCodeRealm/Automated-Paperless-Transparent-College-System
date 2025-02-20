    import * as React from "react";
    import * as TabsPrimitive from "@radix-ui/react-tabs";
    import { cn } from "@/lib/utils";

    const Tabs = React.forwardRef(({ className, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} className={cn("flex flex-col", className)} {...props} />
    ));
    Tabs.displayName = "Tabs";

    const TabsList = React.forwardRef(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn("inline-flex border-b border-muted", className)}
        {...props}
    />
    ));
    TabsList.displayName = "TabsList";

    const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
        "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary",
        className
        )}
        {...props}
    />
    ));
    TabsTrigger.displayName = "TabsTrigger";

    const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
    <TabsPrimitive.Content ref={ref} className={cn("p-4", className)} {...props} />
    ));
    TabsContent.displayName = "TabsContent";

    export { Tabs, TabsList, TabsTrigger, TabsContent };

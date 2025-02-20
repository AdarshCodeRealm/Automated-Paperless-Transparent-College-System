    import * as React from "react";
    import { cn } from "@/lib/utils";

    const Avatar = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
    />
    ));
    Avatar.displayName = "Avatar";

    const AvatarImage = React.forwardRef(({ className, src, alt, ...props }, ref) => (
    <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        {...props}
    />
    ));
    AvatarImage.displayName = "AvatarImage";

    const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (
    <span
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center bg-muted text-muted-foreground", className)}
        {...props}
    >
        {children}
    </span>
    ));
    AvatarFallback.displayName = "AvatarFallback";

    export { Avatar, AvatarImage, AvatarFallback };

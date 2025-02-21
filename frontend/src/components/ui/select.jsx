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
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}>
    <ChevronUpIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}>
    <ChevronDownIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}>
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("p-1", position === "popper" &&
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

	import * as React from "react";
	import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
	import { Check } from "lucide-react";
	import { cn } from "@/lib/utils"; // Make sure this exists

	const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
		"peer h-5 w-5 shrink-0 rounded border border-gray-300 bg-white shadow-sm focus:ring focus:ring-primary checked:bg-primary checked:text-white",
		className
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className="flex items-center justify-center">
		<Check className="h-4 w-4 text-white" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
	));
	Checkbox.displayName = CheckboxPrimitive.Root.displayName;

	export { Checkbox };

import * as React from "react";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Card = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
		{...props}
	/>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-4", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn("text-lg font-semibold leading-none tracking-tight", className)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-4 border-t", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

// Add PropTypes for all Card components
Card.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

CardHeader.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

CardTitle.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

CardContent.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

CardFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

CardDescription.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription };



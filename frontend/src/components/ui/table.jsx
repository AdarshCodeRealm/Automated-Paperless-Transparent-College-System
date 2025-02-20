    import * as React from "react";
    import { cn } from "@/lib/utils";

    const Table = React.forwardRef(({ className, ...props }, ref) => (
    <table
        ref={ref}
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
    />
    ));
    Table.displayName = "Table";

    const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn("bg-muted text-left text-xs font-medium uppercase", className)}
        {...props}
    />
    ));
    TableHeader.displayName = "TableHeader";

    const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("divide-y", className)} {...props} />
    ));
    TableBody.displayName = "TableBody";

    const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn("hover:bg-accent transition-colors", className)}
        {...props}
    />
    ));
    TableRow.displayName = "TableRow";

    const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td ref={ref} className={cn("px-4 py-2", className)} {...props} />
    ));
    TableCell.displayName = "TableCell";

    const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn("px-4 py-2 text-left font-medium", className)}
        {...props}
    />
    ));
    TableHead.displayName = "TableHead";

    export { Table, TableHeader, TableBody, TableRow, TableCell, TableHead };

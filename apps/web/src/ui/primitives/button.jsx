import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary-dark shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
				outline:
          'border border-primary-light bg-background hover:bg-primary-lighter hover:text-primary-dark hover:border-primary shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
				secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-dark shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
				ghost: 'hover:bg-primary-lighter hover:text-primary-dark text-foreground',
				link: 'text-primary-dark underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-full px-3',
				lg: 'h-11 rounded-full px-8',
				icon: 'h-10 w-10 rounded-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };
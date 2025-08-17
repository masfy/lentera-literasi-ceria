import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-lantern text-primary-foreground hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-warm",
        outline:
          "border-2 border-primary text-primary bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:shadow-soft",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-warm",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground hover:backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        lantern: "bg-gradient-lantern text-primary-foreground hover:shadow-glow hover:scale-110 lantern-glow font-semibold transition-all duration-500",
        student: "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-glow hover:scale-105 rounded-xl font-medium",
        teacher: "bg-gradient-to-r from-secondary to-accent text-accent-foreground hover:shadow-soft hover:scale-105 rounded-lg font-medium border border-accent/20",
        success: "bg-success text-success-foreground hover:shadow-soft hover:scale-105",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-14 rounded-xl px-10 text-base font-medium",
        icon: "h-11 w-11",
        xl: "h-16 rounded-2xl px-12 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

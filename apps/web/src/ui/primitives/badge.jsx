import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useZone } from "@/context/ZoneContext.jsx"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        zone: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, specificZone, ...props }) {
  const { zone } = useZone();
  
  // Use zone variant explicitly, or auto-detect if specificZone is provided or we are in a zone
  const isZoneContext = variant === "zone" || specificZone || (variant === "default" && zone);
  
  let zoneClasses = "";
  if (isZoneContext) {
    if (specificZone) {
      zoneClasses = `bg-zone-${specificZone}-soft text-zone-${specificZone}-ink`;
    } else if (zone) {
      zoneClasses = `bg-zone-soft text-zone-ink`;
    } else {
      zoneClasses = "bg-primary-lighter text-primary-dark";
    }
  }

  return (
    <div 
      className={cn(
        badgeVariants({ variant: isZoneContext ? "zone" : variant }), 
        isZoneContext ? zoneClasses : "", 
        className
      )} 
      {...props} 
    />
  )
}

export { Badge, badgeVariants }
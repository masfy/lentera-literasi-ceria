import { Flame } from "lucide-react";

interface LenteraLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export const LenteraLogo = ({ size = "md", showText = true, className = "" }: LenteraLogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl", 
    xl: "text-4xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-lantern rounded-full blur-md opacity-60 animate-pulse-glow"></div>
        <div className="relative bg-gradient-lantern p-2 rounded-full shadow-glow">
          <Flame className={`${sizeClasses[size]} text-primary-foreground`} />
        </div>
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-lantern bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          Lentera
        </span>
      )}
    </div>
  );
};
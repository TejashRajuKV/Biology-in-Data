"use client";

import *;
import *;

import { cn } from "./utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]=horizontal]=vertical]=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };


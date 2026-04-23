"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

const SRC = "/brand/bluebeaver-logo.png"
const W = 694
const H = 132

type BrandLogoProps = {
  className?: string
  size?: "header" | "footer" | "sheet"
  priority?: boolean
}

export function BrandLogo({
  className,
  size = "header",
  priority = false,
}: BrandLogoProps) {
  const sizeClass = {
    header: "h-7 w-auto max-w-[min(12.5rem,70vw)] sm:h-8 sm:max-w-[14rem]",
    footer: "h-6 w-auto sm:h-7",
    sheet: "h-6 w-auto",
  }[size]

  return (
    <Image
      src={SRC}
      alt="BlueBeaver"
      width={W}
      height={H}
      className={cn("object-contain object-left", sizeClass, className)}
      priority={priority}
      sizes="(max-width: 640px) 200px, 240px"
    />
  )
}

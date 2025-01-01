"use client"
import { AutoComplete, type Option } from "@/components/ui/auto-complete"
import { useState } from "react"

const FRAMEWORKS = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "wordpress",
    label: "WordPress",
  },
  {
    value: "express.js",
    label: "Express.js",
  },
  {
    value: "nest.js",
    label: "Nest.js",
  },
]

export default function FilterBrand() {
  
  const [value, setValue] = useState<Option>()

  return (
    <div className="not-prose flex flex-col gap-4 bg-darkColor">
     
      <AutoComplete
        options={FRAMEWORKS}
        emptyMessage="No resulsts."
        placeholder="Find something"
        onValueChange={setValue}
        value={value}
      />
    </div>
  )
}
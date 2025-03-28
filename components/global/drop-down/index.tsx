import * as Popover from "@radix-ui/react-popover"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

type DropDownProps = {
  title: string
  trigger: React.ReactNode
  children: React.ReactNode
  ref?: React.RefObject<HTMLButtonElement>
}

const DropDown = ({ trigger, title, children }: DropDownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div className="cursor-pointer">{trigger}</div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-2xl w-56 items-start bg-background border border-themeGray bg-clip-padding backdrop-filter backdrop-blur-4xl p-4 z-50"
          sideOffset={5}
        >
          {title && <h4 className="text-md pl-2">{title}</h4>}
          {title && <Separator className="bg-primary my-1" />}
          {children}
          <Popover.Arrow className="fill-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default DropDown
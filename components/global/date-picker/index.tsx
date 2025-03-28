"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateOfBirthPickerProps {
  value?: Date
  onChange: (date: Date) => void
  disabled?: boolean
}

export function DateOfBirthPicker({ value, onChange, disabled }: DateOfBirthPickerProps) {
  const [day, setDay] = useState<number | null>(value ? value.getDate() : null)
  const [month, setMonth] = useState<number | null>(value ? value.getMonth() : null)
  const [year, setYear] = useState<number | null>(value ? value.getFullYear() : null)
  const [open, setOpen] = useState(false)

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ]

  // Generate years from 1940 to current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1940 + 1 }, (_, i) => currentYear - i)

  // Update the date when day, month, or year changes
  useEffect(() => {
    if (day !== null && month !== null && year !== null) {
      const maxDaysInMonth = new Date(year, month + 1, 0).getDate()
      const validDay = Math.min(day, maxDaysInMonth)
      const newDate = new Date(year, month, validDay)
      
      // Only call onChange if the date is different from the current value
      if (!value || newDate.getTime() !== value.getTime()) {
        onChange(newDate)
      }
    }
  }, [day, month, year])

  // Update local state when value changes
  useEffect(() => {
    if (value) {
      const newDay = value.getDate()
      const newMonth = value.getMonth()
      const newYear = value.getFullYear()
      
      // Only update if values are different
      if (newDay !== day || newMonth !== month || newYear !== year) {
        setDay(newDay)
        setMonth(newMonth)
        setYear(newYear)
      }
    }
  }, [value])

  return (
    <div className="grid grid-cols-7 gap-2">
      {/* Day selector */}
      <div className="col-span-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn("w-full justify-between", !day && "text-muted-foreground")}
              disabled={disabled}
            >
              {day ? day : "Day"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search day..." />
              <CommandEmpty>No day found.</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {days.map((d) => (
                    <CommandItem
                      key={d}
                      value={d.toString()}
                      onSelect={() => {
                        setDay(d)
                      }}
                    >
                      {d}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Month selector */}
      <div className="col-span-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn("w-full justify-between", !month && month !== 0 && "text-muted-foreground")}
              disabled={disabled}
            >
              {month !== null ? months[month].label : "Month"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search month..." />
              <CommandEmpty>No month found.</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {months.map((m) => (
                    <CommandItem
                      key={m.value}
                      value={m.label}
                      onSelect={() => {
                        setMonth(m.value)
                      }}
                    >
                      {m.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Year selector */}
      <div className="col-span-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn("w-full justify-between", !year && "text-muted-foreground")}
              disabled={disabled}
            >
              {year ? year : "Year"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." />
              <CommandEmpty>No year found.</CommandEmpty>
              <CommandGroup>
                <CommandList className="max-h-[300px]">
                  {years.map((y) => (
                    <CommandItem
                      key={y}
                      value={y.toString()}
                      onSelect={() => {
                        setYear(y)
                        setOpen(false)
                      }}
                    >
                      {y}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}


'use client'

import { Wand2 } from 'lucide-react'

import { PromptSelect } from '@/components/prompt-select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'

interface RunAIFormProps {
  handlePromptSelected: (template: string) => void
  handleTemperatureChange: (value: number) => void
  temperature: number
}

export function RunAIForm({
  handlePromptSelected,
  handleTemperatureChange,
  temperature,
}: RunAIFormProps) {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label>Prompt</Label>
        <PromptSelect onPromptSelected={handlePromptSelected} />

        <span className="block text-xs text-muted-foreground italic">
          You will be able to change this option soon
        </span>
      </div>

      <div className="space-y-2">
        <Label>Model</Label>
        <Select disabled defaultValue="gpt3.5">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
          </SelectContent>
        </Select>

        <span className="block text-xs text-muted-foreground italic">
          You will be able to change this option soon
        </span>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Temperature</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={(value) => handleTemperatureChange(value[0])}
        />
        <span className="block text-xs text-muted-foreground italic leading-relaxed">
          Higher values tend to make the result more creative but more
          susceptible to errors
        </span>
      </div>

      <Separator />

      <Button type="submit" className="w-full">
        Run <Wand2 className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}

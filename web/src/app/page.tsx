import { Github, Wand2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { VideoInputForm } from '@/components/video-input-form'
import { PromptSelect } from '@/components/prompt-select'

export default function Home() {
  function handlePromptSelected(template: string) {
    console.log(template)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-6">
          <span className="text-sm text-muted-foreground">
            Developed with 💜 during the NLW by Rocketseat
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-4 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Enter the prompt for the AI..."
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Results generated by AI..."
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Remember: you can use the{' '}
            <code className="text-violet-400">{'{transcription}'}</code>{' '}
            variable in your prompt to insert the transcripted content of your
            video
          </p>
        </div>

        <div className="w-80 space-y-6">
          <VideoInputForm />

          <Separator />

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
              <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />
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
        </div>
      </main>
    </div>
  )
}

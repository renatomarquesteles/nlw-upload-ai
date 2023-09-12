import { FileVideo, Github, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function Home() {
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

      <main className="flex-1 p-6 flex gap-6">
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
          <form className="space-y-6">
            <label
              htmlFor="video"
              className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground transition-colors hover:bg-primary/5"
            >
              <FileVideo className="w-4 h-4" />
              Select a video
            </label>

            <input
              type="file"
              id="video"
              accept="video/mp4"
              className="sr-only"
            />

            <Separator />

            <div className="space-y-1">
              <Label htmlFor="transcription_prompt">Transcription Prompt</Label>
              <Textarea
                id="transcription_prompt"
                className="min-h-20 leading-relaxed"
                placeholder="Add keywords mentioned in the video separated by commas"
              />
            </div>

            <Button type="submit" className="w-full">
              Load video
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

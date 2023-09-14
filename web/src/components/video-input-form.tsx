import { FileVideo, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

export function VideoInputForm() {
  return (
    <form className="space-y-4">
      <label
        htmlFor="video"
        className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground transition-colors hover:bg-primary/5"
      >
        <FileVideo className="w-4 h-4" />
        Select a video
      </label>

      <input type="file" id="video" accept="video/mp4" className="sr-only" />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Transcription Prompt</Label>
        <Textarea
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Add keywords mentioned in the video separated by commas"
        />
      </div>

      <Button type="submit" className="w-full">
        Load video
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}

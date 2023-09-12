import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

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
        <div className="w-80"></div>
      </main>
    </div>
  )
}

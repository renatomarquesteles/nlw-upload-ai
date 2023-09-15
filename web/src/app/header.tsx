import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Header() {
  return (
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
  )
}

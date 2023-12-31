import Link from 'next/link'
import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
    <header className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">upload.ai</h1>

      <div className="flex items-center gap-6">
        <span className="text-sm text-muted-foreground">
          Developed with 💜 during the NLW by Rocketseat
        </span>

        <Separator orientation="vertical" className="h-6" />

        <ThemeToggle />

        <Separator orientation="vertical" className="h-6" />

        <Link
          href="https://github.com/renatomarquesteles/nlw-upload-ai"
          target="_blank"
        >
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </Link>
      </div>
    </header>
  )
}

'use client'

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { FileVideo, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

type Status =
  | 'waiting'
  | 'converting'
  | 'uploading'
  | 'transcribing'
  | 'success'

const statusMessages = {
  converting: 'Converting...',
  uploading: 'Uploading...',
  transcribing: 'Transcribing...',
  success: 'Success!',
}

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setStatus('waiting')
  }, [videoFile])

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) return

    setVideoFile(files[0])
  }

  async function convertVideoToAudio(video: File) {
    const ffmpeg = await getFFmpeg()

    // adds video to ffmpeg context
    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    ffmpeg.on('progress', (progress) =>
      console.log('Convert progress: ' + Math.round(progress.progress * 100)),
    )

    // converts mp4 to mp3
    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    // gets the mp3
    const data = await ffmpeg.readFile('output.mp3')

    // converts to File type
    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    console.log('Conversion completed')

    return audioFile
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) return

    setStatus('converting')

    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData()

    data.append('file', audioFile)

    setStatus('uploading')

    const response = await fetch('http://localhost:3333/videos', {
      method: 'POST',
      body: data,
    }).then((response) => response.json())

    const videoId = response.video.id

    setStatus('transcribing')

    await fetch(`http://localhost:3333/videos/${videoId}/transcription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    setStatus('success')
  }

  const videoPreviewUrl = useMemo(() => {
    if (!videoFile) return null

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className="space-y-4" onSubmit={handleUploadVideo}>
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground transition-colors hover:bg-primary/5"
      >
        {videoPreviewUrl ? (
          <video
            src={videoPreviewUrl}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Select a video
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Transcription Prompt</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Add keywords mentioned in the video separated by commas"
          disabled={status !== 'waiting'}
        />
      </div>

      <Button
        type="submit"
        className="w-full transition-all data-[success=true]:bg-emerald-700 data-[success=true]:text-white data-[success=true]:opacity-100"
        data-success={status === 'success'}
        disabled={status !== 'waiting'}
      >
        {status === 'waiting' ? (
          <>
            Load video
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  )
}

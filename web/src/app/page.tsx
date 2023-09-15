import { Content } from './content'
import { Header } from './header'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Content />
    </div>
  )
}

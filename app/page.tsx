import { Card } from '~/components'

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-taebaek text-[30px]">Hello</h1>
      <Card>
        <p className="dark:text-white">Hello</p>
      </Card>
    </main>
  )
}

export default Home

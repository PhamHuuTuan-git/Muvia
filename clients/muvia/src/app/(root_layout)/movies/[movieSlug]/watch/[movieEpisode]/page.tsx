import WatchingPage from '@/pages/WatchingPage/WatchingPage'
import React from 'react'
type Props = {
  params: Promise<{ movieEpisode: string }>
}
async function WatchingMovie({ params }: Props) {
  const episode = (await params).movieEpisode;
  console.log("episode; ", episode);
  return (
    <>
      <WatchingPage idMovie='1' episode='1' />
    </>

  )
}

export default WatchingMovie
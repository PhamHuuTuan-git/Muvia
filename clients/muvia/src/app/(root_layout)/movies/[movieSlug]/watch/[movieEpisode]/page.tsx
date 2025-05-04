import WatchingPage from '@/pages/WatchingPage/WatchingPage'
import React from 'react'
type Props = {
  params: Promise<{ 
    movieSlug: string,
    movieEpisode: string 
  }>
}
async function WatchingMovie({ params }: Props) {
  const episode = (await params).movieEpisode;
  const slug = (await params).movieSlug;
  const real_episode = episode.split("-")[1]
  console.log("episode; ", episode);
  return (
    <>
      {
        real_episode && real_episode!=="" ? <WatchingPage slug={slug} episode={real_episode} /> :
        <p style={{color:"#fff", fontWeight:"bold"}}>Not exist this episode</p>
      }
    </>

  )
}

export default WatchingMovie
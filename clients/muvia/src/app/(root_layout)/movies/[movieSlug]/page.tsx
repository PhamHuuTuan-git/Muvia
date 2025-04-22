import DetailMovie from "@/pages/DetailMovie/DetailMovie";

type Props = {
  params: Promise<{ movieSlug: string }>
}

async function MovieSlug({ params }: Props) {
  const movieSlug = (await params).movieSlug;
  return (
    <DetailMovie slug={movieSlug} id ="123"/>
  )
}

export default MovieSlug
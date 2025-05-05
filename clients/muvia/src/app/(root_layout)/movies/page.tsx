import MoviesPage from "@/pages/MoviesPage/MoviesPage"

async function MoviesPageMain({ searchParams }: {
  searchParams: Promise<{
    type: string,
    category: string,
    country: string,
    year: string,
    sort: string,
    page: string
  }>
}) {
  const { type = "tat-ca", category="tat-ca", country="tat-ca",year="tat-ca",sort="mac-dinh",page="1" } = await searchParams;
  const queryParams = {
    type, category, country,year,sort, 
    page: Number(page) || 1
  }
  return (
    <div>
      <MoviesPage queryParams={queryParams} />
    </div>
  )
}

export default MoviesPageMain
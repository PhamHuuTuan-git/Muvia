
import FindingPage from "@/pages/FindingPage/FindingPage"
async function Finding({ searchParams }: {
  searchParams: Promise<{
    content: string,
    page: string
  }>
}) {
  const {page = "1", content = ""} = await searchParams
  const queryParams = {page: Number(page) || 1, content}
  return (
    <FindingPage queryParams={queryParams}/>
  )
}

export default Finding
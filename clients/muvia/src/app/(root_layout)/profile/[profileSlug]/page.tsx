import LikedMoviesPage from "@/pages/LikedMoviesPage/LikedMoviesPage";
import RecentWatchingPage from "@/pages/RecentWatchingPage/RecentWatchingPage";
import UserPage from "@/pages/UserPage/UserPage";

type Props = {
    params: Promise<{ profileSlug: string }>
  }

  
async function Me({ params }: Props) {
    const profileSlug = (await params).profileSlug;
    if(profileSlug === "me") {
        return (
            <UserPage />
        )
    }
    if(profileSlug === "liked") {
        return(
            <LikedMoviesPage />
        )
    }
    if(profileSlug === "recent-watching") {
        return (
            <RecentWatchingPage />
        )
    }
  }
  
  export default Me
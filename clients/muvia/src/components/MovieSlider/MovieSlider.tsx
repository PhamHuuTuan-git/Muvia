import "./style.scss"
import MovieCard from '../MovieCard/MovieCard';
type Movie = {
    name: string;
    id: string;
    url: string;
};

type Props = {
    movies: Movie[];
    itemsPerScreen: number
};
function MovieSlider({ movies, itemsPerScreen }: Props) {
    return (
        <div>
            <div className="list--cards">

                {
                    movies.map((ele, index) => {
                        return (
                            <div key={index} style={{width: `${100/itemsPerScreen}%`, minWidth:`${100/itemsPerScreen}%`}}>
                                <MovieCard
                                    slug="heo-an-toi"
                                    id={ele.id}
                                    url={ele.url}
                                    name={ele.name}
                                    imdb='7.6'
                                    view='12' />
                            </div>

                        )
                    })
                }
            </div>

        </div>
    )
}

export default MovieSlider
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// import { GET_API } from "../../Service/Axios/fetchData";
import { saveNews } from "../../Redux/Slice/newsSlice";
import { loadingScreen } from "../../Redux/Slice/userSlice";

import { GET_API } from '../../Service/Axios/fetchData'

import { toast } from 'react-toastify';
import Loader from "../../Service/Loader";
import { Link, useNavigate } from 'react-router-dom';
export default function News() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let news = useSelector((state) => state.news.articles);
    let isLoading = useSelector((state) => state.auth.isLoading);
    const [error, setError] = useState(null);
    useEffect(() => {
        dispatch(loadingScreen());
        if (news.length == 0) {
            const getNews = async () => {
                const response = await GET_API('https://newsdata.io/api/1/news?country=np&q=कृषि&apikey=pub_3416653c5f22fd050afe4a9b612e5b09bab84');
                if (response && response.status == "success") {
                    dispatch(saveNews(response.results));
                    dispatch(loadingScreen());
                    toast.success('News Fetched Successfully');
                } else {
                    setError(response.message);
                    dispatch(loadingScreen());
                    toast.error(response.message);
                }
            }
            getNews();
        } else {
            dispatch(loadingScreen());
        }
    }, [])
    return (
        <>
            {
                isLoading || news.length == 0 ? (
                    <Loader />
                ) : (
                    <div className="px-4 py-8 w-full sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-black w-max">Recent News</h2>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {
                                news && news.length > 0 ? (
                                    <>
                                        {news.map((newsPiece) => (
                                            <div key={newsPiece.article_id} className="group relative bg-white rounded-lg">
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                    <Link to={{ pathname: '/news-description', state: { newsPiece } }}>
                                                        <img
                                                            src={newsPiece.image_url}
                                                            alt={newsPiece.title}
                                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="mt-4 px-5 flex justify-between">
                                                    <div>
                                                        <a onClick={(e) => {
                                                            e.preventDefault();
                                                            navigate('/news-description', { state: { newsPiece } });
                                                        }}>
                                                            <h3 className="text-md text-gray-700">
                                                                <span aria-hidden="true" className="absolute inset-0" />
                                                                {newsPiece.title}
                                                            </h3>
                                                            <p className="mt-1 text-md text-gray-500">{newsPiece.pubDate}</p>
                                                        </a>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {
                                            error ? (
                                                <>
                                                    <p className="text-lg text-red-600">Error to Show : {error}</p>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }

                        </div>
                    </div>

                )
            }
        </>
    );
}

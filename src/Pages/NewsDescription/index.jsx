import { useLocation } from 'react-router-dom';

export default function NewsDescription(props) {
    const location = useLocation();
    const newsPiece = location.state.newsPiece;
    return (
        <div className="main bg-white">
            <div className="mx-auto max-w-2xl items-center px-4 py-9 sm:px-6 sm:py-4 lg:max-w-7xl lg: lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{newsPiece.title} - {newsPiece.pubDate}</h2>
                    <div className="photo pt-8">
                        <img src={newsPiece.image_url} alt="" />
                    </div>
                    <dl className="mt-8">
                        <p className="text-gray-500 text-md">
                            {newsPiece.content}
                        </p>
                    </dl>
                </div>

            </div>
        </div>
    )
}

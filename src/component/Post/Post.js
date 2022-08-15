import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom/client";

function Post() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
            fetch("/posts")
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setPostList(result);
                    }
                )
                .catch(
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
        , []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <div>
                <h1>Posts</h1>
                <ul>
                    {postList.map(post => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Post;
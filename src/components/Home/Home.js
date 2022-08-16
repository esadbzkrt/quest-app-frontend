import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";



function Home() {
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
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">
                <h1>Home</h1>
                {postList.map(post => (
                    <Post key={post.id} title={post.title} text={post.text}/>
                ))}
            </div>

        );
    }
}

export default Home;
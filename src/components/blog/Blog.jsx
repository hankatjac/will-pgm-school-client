import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Sider from "./Sider";
import { API_URL } from "../../apiPath";
import DOMPurify from "dompurify";
import { ProgressBar } from "react-loader-spinner";
// import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cat = useLocation().search;
  // console.log(cat);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
        alert(err.response.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [cat]);

  return (
    <section className="overflow-hidden pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {isLoading ? (
              <ProgressBar
                height="80"
                width="100%"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor="#F4442E"
                barColor="#51E5FF"
              />
            ) : (
              posts
                .slice()
                .reverse()
                .map((post) => (
                  <div key={post.id} className="card mb-4">
                    <Link
                      className="text-muted text-decoration-none"
                      to={`/posts/${post.id}`}
                      state={post}
                    >
                      <h1>{post.title}</h1>
                      {post.img && (
                        <img
                          className="img-fluid"
                          src={`${API_URL}/pictures/${post.img}`}
                          alt=""
                        />
                      )}
                    </Link>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          post.desc?.substring(0, 200)
                        ),
                      }}
                    ></p>
                    {/* <p>{getText(post.desc).substring(0, 200)}</p> */}
                  </div>
                ))
            )}
          </div>
          <div className="col-md-3 ms-auto">
            <Sider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;

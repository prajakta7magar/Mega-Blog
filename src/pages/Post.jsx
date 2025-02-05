import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import service from '../Appwrite/config_bucket';
import parse from 'html-react-parser'; // Correct import
import { useSelector } from 'react-redux';

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate('/');
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (post) {
      service.deletePost(post.$id).then((status) => {
        if (status) {
          service.deleteFile(post.featuredImage);
          navigate('/');
        }
      });
    }
  };

  return post ? (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="w-full flex justify-center p-2 mb-4 relative border rounded-xl">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/EditPost/${post.$id}`}>
                <button className="bg-green-600 text-white px-4 py-2 rounded mr-3">
                  Edit
                </button>
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <div className="prose">{parse(post.content)}</div>
      </div>
    </div>
  ) : null;
}

export default Post;

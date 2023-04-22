import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

import { toastContext } from "../../context/ToastContext";

const BlogDetail = () => {
  const params = useParams();
  const id = params.id;
  const [blog, setBlog] = useState();
  const [comments, setComments] = useState();
  const [seeComments, setSeeComments] = useState(false);
  const { setToastStack } = useContext(toastContext);

  async function addComment(e) {
    e.preventDefault();
    const message = e.target[0].value;
    if (message.trim().length < 1) {
      setToastStack([{ type: "error", message: "Comment cannot be empty" }]);
      return;
    }
    const res = await fetch(`https://localhost:7191/api/Comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: e.target[0].value,
        blogId: id,
        published: new Date().toISOString(),
      }),
    });
    const data = await res.json();
    setToastStack([{ type: "success", message: "Thanks for the comment" }]);
    setComments([...comments, data]);
    e.target.reset();
  }

  useEffect(() => {
    async function getBlog() {
      const res = await fetch(`https://localhost:7191/api/Blogs/${id}`);
      const data = await res.json();
      setBlog(data);
    }
    async function getComments() {
      const res = await fetch(`https://localhost:7191/api/Comments`);
      const data = await res.json();
      setComments(data.filter((comment) => comment.blogId == id));
    }

    getBlog();
    getComments();
    return () => {};
  }, [id]);
  return (
    <div>
      <div className="w-full rounded-lg overflow-hidden bg-primary dark:bg-primary-dark">
        <img
          src={blog?.image}
          alt={blog?.title}
          className="aspect-[3.5/1.5] object-cover"
        />
        <div className="p-4">
          <h2 className="text-4xl font-medium my-2 text-text dark:text-text-dark">
            {blog?.title}
          </h2>
          <p className="text-text/70 dark:text-text-dark/70 text-sm my-3">
            {new Date(blog?.date).toDateString()} |{" "}
            <Link
              to={`/categories?category=${blog?.category.title}`}
              className="hover:text-text dark:hover:text-text-dark"
            >
              {blog?.category.title}
            </Link>
          </p>
          <hr className="border w-24 my-4" />
          <div
            className="text-text dark:text-text-dark text-base"
            dangerouslySetInnerHTML={{
              __html: blog?.content
                .replaceAll("<script ", "script")
                .replaceAll("</p>", "</p> <br />"),
            }}
          ></div>
          {blog && blog.googleMapsCoordinates ? (
            <div>
              <iframe
                className="w-full aspect-square"
                src={`https://maps.google.com/maps?q=${blog?.googleMapsCoordinates}&z=8&t=h&output=embed`}
              ></iframe>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="my-10">
        <Link
          to="/"
          className="bg-text/50 dark:bg-text-dark/30 text-text-dark hover:text-text dark:text-text dark:hover:text-text-dark rounded-lg p-3 px-5"
        >
          ← All posts
        </Link>
      </div>
      {seeComments ? (
        <>
          <div className="text-center text-text dark:-text-text-dark">
            <button
              className="hover:text-purple-500 dark:hover:text-purple-500"
              onClick={() => setSeeComments(false)}
            >
              Hide comments
            </button>
          </div>
          <div className="bg-primary dark:bg-primary-dark border rounded-lg p-5">
            <h2 className="text-3xl font-medium my-2 text-text dark:text-text-dark">
              Comments
            </h2>
            <hr className="border w-24 mt-4" />
            <form
              className="flex gap-2 items-center border-t py-5"
              onSubmit={addComment}
            >
              <input
                type="text"
                placeholder="Add comment"
                minLength={1}
                required
              />
              <button className="bg-text/50 dark:bg-text-dark/30 text-text-dark hover:text-text dark:text-text dark:hover:text-text-dark rounded-lg p-2.5 px-5">
                Post
              </button>
            </form>
            <div className="space-y-5">
              {!comments?.length < 1 ? (
                comments?.map((comment) => (
                  <div
                    className="flex gap-5 items-center border-t pt-5"
                    key={comment?.id}
                  >
                    <div
                      className="w-10 h-10 rounded-lg overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: createAvatar(thumbs, {
                          seed: comment?.id,
                          size: 40,
                          backgroundColor: [
                            "FF5733",
                            "DAF7A6",
                            "118AB2",
                            "2C2C54",
                            "F94144",
                            "F8961E",
                            "90BE6D",
                            "F3722C",
                            "43AA8B",
                            "F7D488",
                            "FDCB6E",
                            "E63946",
                            "A8DADC",
                            "457B9D",
                            "1D3557",
                            "FCA311",
                            "3A86FF",
                            "FDEDEC",
                            "B5EAEA",
                            "B8B5FF",
                          ],
                          eyesColor: [
                            "000000",
                            "FFFFFF",
                            "FFC0CB",
                            "008080",
                            "FFD700",
                          ],
                        }),
                      }}
                    ></div>
                    <p className="text-text/70 dark:text-text-dark/70 text-sm border p-3 grow">
                      {comment?.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-text dark:-text-text-dark">
                  No comments yet
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-text dark:-text-text-dark">
          <button
            className="hover:text-purple-500 dark:hover:text-purple-500"
            onClick={() => setSeeComments(true)}
          >
            Show comments
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;

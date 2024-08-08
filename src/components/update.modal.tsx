import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr"
interface Iprops {
  show: boolean;
  setShow: (v: boolean) => void;
  blog : IBlog
}

export default function UpdateModal(props: Iprops) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = () => {
    fetch(`http://localhost:8000/blogs/${props.blog.id}`, {
      method: 'PUT', // Specify the method as PUT
      headers: {
        'Content-Type': 'application/json', // Set the content type
        'Authorization': 'Bearer your_token_here' // Include any necessary authorization headers
      },
      body: JSON.stringify({ title, author, content }) // Include the data to update in the request body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        console.log('Success:', data);
        toast.success("Success");
        mutate("http://localhost:8000/blogs")
        handleCloseModal()
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
  };

  const handleCloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    props.setShow(false);
    
  };
  return (
    <div>
      {props.show && (
        <div
          className="modal show d-block"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update blog
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="title"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input
                    type="author"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Author"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="btn btn-secondary"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

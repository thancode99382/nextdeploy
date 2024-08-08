import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr"
interface Iprops {
  show: boolean;
  setShow: (v: boolean) => void;
}

export default function Modal(props: Iprops) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = () => {
    fetch("http://localhost:8000/blogs", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title, author, content }),
    })
      .then(function (res) {
        console.log("CheckData=>>", res);
        mutate("http://localhost:8000/blogs")
      })
      .then(function (res) {
        toast.success("Success");
        
        handleCloseModal();
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
                  Modal title
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
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    onChange={(e) => setContent(e.target.value)}
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

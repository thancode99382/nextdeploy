import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  blogs: IBlog[];
  setBlog: (v: IBlog) => void;
  setShow: (v: boolean) => void;
 
}
export default function Table(props: IProps) {
  const { blogs } = props;

  const [blog, setBlog] = useState<IBlog | null>(null);

  const handleEdit = (blog: IBlog) => {
    props.setShow(true);
    props.setBlog(blog);
  };

  const handleDelete = (blog: IBlog) => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => {
        console.log(res)
        toast("Success");
        mutate("http://localhost:8000/blogs")
      });
  };

  return (
    <tbody>
      {blogs?.map((blog) => (
        <tr key={blog.id}>
          <th scope="row">{blog.id}</th>
          <td>{blog.title}</td>
          <td>{blog.author}</td>

          <td>
            <Link type="button" href={`/blogs/${blog.id}`}  className="btn btn-primary ">
              View
            </Link>
            <button onClick={()=>handleDelete(blog)} type="button" className="btn btn-danger mx-3">
              Delete
            </button>
            <button
              onClick={() => handleEdit(blog)}
              type="button"
              className="btn btn-warning"
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

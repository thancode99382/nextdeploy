"use client";
import Table from "@/components/app.table";

import Modal from "@/components/create.modal";
import UpdateModal from "@/components/update.modal";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlog | null>(null);

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        throw err;
      });

  const { data, error, isLoading } = useSWR<IBlog[]>(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={handleShow}>
        Add New
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Content</th>
          </tr>
        </thead>
        
           <Table blogs={data || []} setBlog={setBlog} setShow={setShowModalUpdate}  />
       
      </table>

      {showModal && <Modal show={showModal} setShow={setShowModal} />}
      {showModalUpdate && blog && (
        <UpdateModal
          show={showModalUpdate}
          blog={blog}
          setShow={setShowModalUpdate}
        />
      )}
    </div>
  );
}

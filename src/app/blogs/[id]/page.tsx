'use client'
import { useEffect, useState } from "react";

export default function ViewDetail({ params }: { params: { id: string } }) {
  const [data, setData] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/blogs/${params.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: IBlog = await response.json();
        setData(result);
      } catch (err) {
        setError("An error occurred while fetching data.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {data?.title}
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <h1>{data?.author}</h1>
              <strong>{data?.content}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

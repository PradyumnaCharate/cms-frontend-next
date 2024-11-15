"use client";

import useSWR from "swr";
import CustomTable, {
  DeleteButton,
  EditButton,
  ViewButton,
} from "@/components/CustomTable";
import { Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useState } from "react";
import ViewModal from "@/components/Modal/ViewModal";

const fetcher = (url) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });
};

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/posts`,
    fetcher
  );

  const [showPreview, setShowPreview] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleShowModal = () => setShowPreview(true);
  const handleCloseModal = () => {
    setShowPreview(false);
    setSelectedData(null);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleHideDeleteModal = () => {
    setSelectedData(null);
    setShowDeleteModal(false);
  };
  //   console.log(pages?.data?.items[0]?.title)
  //   if (error) return <Container>Error: {error.message}</Container>;
  //   if (!data) return <Container>Loading...</Container>;
  const handleDelete = async () => {
    // e.preventDefault();
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/posts/${selectedData?.id}`;
    const method = "DELETE";

    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the data");
      }
      alert("Blog deleted successfully");
      setLoading(false);
      mutate();
      handleHideDeleteModal();
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      alert("Failed to delete the data");
    }
  };
  return (
    <Container>
      <CustomTable
        title={"Blogs"}
        isSearch={false}
        column={["Sr.No", "Title", "Status", "Created At", "Actions"]}
        paging={false}
        createOnClick={() => router.push("/dash/blogs/add")}
        createText={"Create Blog"}
        loading={isLoading}
      >
        {data?.data?.items?.map((data, i) => (
          <tr key={i} className="odd" style={{ fontSize: "0.75rem" }}>
            <td className="text-center">{i + 1}</td>
            <td className="text-center">{data?.title}</td>
            <td className="text-center text-capitalize">{data?.status}</td>
            <td className="text-center">
              {new Date(data?.createdAt).toLocaleDateString()}
            </td>
            <td className="text-center">
              <ViewButton
                onClick={() => {
                  setSelectedData(data);
                  handleShowModal();
                }}
              />
              <EditButton
                onClick={() => router.push(`/dash/blogs/${data?.slug}`)}
              />
              <DeleteButton
                onClick={() => {
                  setSelectedData(data);
                  handleShowDeleteModal();
                }}
              />
            </td>
          </tr>
        ))}
      </CustomTable>

      <DeleteModal
        title={"Are you sure you want to delete this blog?"}
        onDiscard={handleHideDeleteModal}
        show={showDeleteModal}
        onHide={handleHideDeleteModal}
        onConfirm={handleDelete}
        loading={loading}
      />

      <ViewModal
        onHide={handleCloseModal}
        show={showPreview}
        title={selectedData?.title}
        content={selectedData?.content}
      />
    </Container>
  );
}

export default Page;

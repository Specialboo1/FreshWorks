import React, { useEffect, useState } from "react";
import CardLayout from "../scenecomponents/Cardlayout";
import CommonAction from "../common/Actions/commonActions";

const Card = () => {
  const [posts, getPosts] = CommonAction({
    CRUDbaseUrl: {
      read: `https://jsonplaceholder.typicode.com/posts`,
    },
  });
  const [users, getusers] = CommonAction({
    CRUDbaseUrl: {
      readId: `https://picsum.photos/v2/list?page=1`,
    },
  });
  const [comments, getComments] = CommonAction({
    CRUDbaseUrl: {
      readId: `https://jsonplaceholder.typicode.com/comments`,
    },
  });
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [detailpage, setDetailPage] = useState(false);

  useEffect(() => {
    if (!posts.isLoading && posts.data?.length) {
      getusers({ data: `&limit=${posts.data.length}` });
    }
  }, [posts]);

  useEffect(() => {
    if (!users.isLoading && users.data?.length && posts.data?.length) {
      const dataCopy = posts.data.map((ele, index) => ({
        ...ele,
        author: users.data[index].author,
        url: users.data[index].download_url,
      }));
      setData(dataCopy);
    }
  }, [users]);

  return (
    <CardLayout
      data={data}
      isLoading={users.isLoading || posts.isLoading}
      cmtLoading={comments.isLoading}
      onClickRow={(data) => {
        setSelectedData(data);
        setDetailPage(true);
        getComments({ data: `?postId=${data.id}` });
      }}
      selectedData={selectedData}
      detailpage={detailpage}
      comments={comments}
      onGoBack={() => setDetailPage(false)}
    />
  );
};

export default Card;

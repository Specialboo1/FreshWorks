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
  const [data, setData] = useState([]);

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
      console.log(dataCopy);
    }
  }, [users]);

  return (
    <CardLayout
      data={data}
      isLoading={users.isLoading || posts.isLoading}
      onClickRow={(data) => console.log(data)}
    />
  );
};

export default Card;

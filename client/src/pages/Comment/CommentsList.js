import { React } from "react";

import { Divider, Comment, List } from "antd";
import Loading from "components/Loading";

import { useSubscription } from "@apollo/client";
import { COMMENTS_SUBSCRIPTION } from "./queries";
import NewCommentForm from "./NewCommentForm";

function CommentsList({ post_id }) {
  const { loading, error, data } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: { post_id },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Divider orientation="left">Comments</Divider>

      {!loading && data && (
        <>
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={data.commnets}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.user.fullName}
                  avatar={item.user.profile_photo}
                  content={item.text}
                />
              </li>
            )}
          />
          <Divider orientation="left">New Comment</Divider>
          <NewCommentForm post_id={post_id} />
        </>
      )}
    </>
  );
}

export default CommentsList;

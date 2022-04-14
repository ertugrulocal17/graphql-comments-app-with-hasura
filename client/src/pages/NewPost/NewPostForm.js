import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import styles from "./styles.module.css";

import { useNavigate } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, NEW_POST_MUTATION } from "./queries";
const { Option } = Select;

function NewPostForm() {
  const navigate = useNavigate();
  const [savePost, { loading }] = useMutation(NEW_POST_MUTATION);

  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);

  const handleSubmit = async (values) => {
    try {
      await savePost({
        variables: {
          input: values,
        },
      });
      message.success("Post Saved!", 4);
      navigate("/");
    } catch (e) {
      console.log(e);
      message.error("Post Not Saved", 10);
    }
  };
  return (
    <div>
      <Form name="basic" onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input a title!" }]}
        >
          <Input disabled={loading} size="large" placeholder="Title" />
        </Form.Item>

        <Form.Item name="short_description">
          <Input
            disabled={loading}
            size="large"
            placeholder="Short Description"
          />
        </Form.Item>

        <Form.Item name="description">
          <Input.TextArea
            disabled={loading}
            size="large"
            placeholder="Description"
          />
        </Form.Item>

        <Form.Item name="cover">
          <Input.TextArea disabled={loading} size="large" placeholder="Cover" />
        </Form.Item>

        <Form.Item
          name="user_id"
          rules={[{ required: true, message: "Please select user!" }]}
        >
          <Select
            disabled={get_users_loading || loading}
            loading={get_users_loading}
            placeholder="Select a user"
            size="large"
          >
            {users_data &&
              users_data.users.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.fullName}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item className={styles.buttons}>
          <Button
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewPostForm;

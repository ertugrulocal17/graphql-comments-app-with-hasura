import { React, useRef } from "react";
import { Form, Input, Button, Select, message, Row, Col } from "antd";
import styles from "./styles.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, CREATE_COMMENT_MUTATION } from "./queries";
const { Option } = Select;

function NewCommentForm({ post_id }) {
  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION);
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);
  const formRef = useRef();
  const handleSubmit = async (values) => {
    try {
      await createComment({
        variables: {
          input: { ...values, post_id },
        },
      });
      message.success("Comment added!", 3);
      formRef.current.resetFields();
    } catch (e) {
      console.log(e);
      message.error("Comment not saved!", 10);
    }
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={handleSubmit}
        autoComplete="off"
        ref={formRef}
      >
        <Row gutter={24}>
          <Col span={10}>
            <Form.Item
              disabled={loading}
              name="user_id"
              rules={[{ required: true, message: "Please select user!" }]}
            >
              <Select
                disabled={get_users_loading || loading}
                loading={get_users_loading}
                placeholder="Select a user"
                size="medium"
              >
                {users_data &&
                  users_data.users.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.fullName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name="text"
              rules={[{ required: true, message: "Please enter a message!" }]}
            >
              <Input disabled={loading} size="medium" placeholder="Message" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className={styles.buttons}>
          <Button
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewCommentForm;

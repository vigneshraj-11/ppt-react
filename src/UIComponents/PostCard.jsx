import React, { useState } from "react";
import { Card, Button, Avatar, Input, List } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const emojis = [
  { icon: "❤️", label: "Heart" },
  { icon: "👏", label: "Clap" },
  { icon: "🎉", label: "Celebration" },
  { icon: "🎊", label: "Congrats" },
];

const PostCard = ({ post }) => {
  if (!post) {
    console.error("Post object is missing!");
    return null;
  }

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setLikes(likes + 1);
    // Implement the logic for sending the reaction, e.g., API call
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment("");
      // Implement the logic for adding a comment, e.g., API call
    }
  };

  return (
    <Card
      style={{
        marginRight: 16,
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: 16,
      }}
      className="border rounded-sm shadow-sm"
      cover={
        <img
          alt="post"
          src={post.image}
          style={{ height: 350, objectFit: "cover" }}
        />
      }
      actions={[
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {emojis.map((emoji) => (
            <Button
              type="text"
              key={emoji.label}
              onClick={() => handleEmojiClick(emoji)}
              style={{
                backgroundColor: selectedEmoji === emoji ? "#f0f0f0" : "none",
              }}
            >
              {emoji.icon} {selectedEmoji === emoji && likes}
            </Button>
          ))}
        </div>,
        <Button
          type="text"
          icon={<MessageOutlined />}
          onClick={handleCommentToggle}
        >
          Comment
        </Button>,
      ]}
    >
      <Card.Meta description={post.description} />
      {showComments && (
        <div>
          <List
            dataSource={comments}
            renderItem={(comment, index) => (
              <List.Item key={index}>{comment}</List.Item>
            )}
          />
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onPressEnter={handleAddComment}
          />
          <Button type="primary" onClick={handleAddComment}>
            Post
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PostCard;

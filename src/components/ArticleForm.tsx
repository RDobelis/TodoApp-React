import React, { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { Article } from "../types/article";
import "../styles/components/article-form.scss";

type ArticleFormProps = {
  onSubmit: (body: Article) => void;
  onCancel: () => void;
  initialValues?: Article;
};

export const ArticleForm = ({
  onSubmit,
  onCancel,
  initialValues,
}: ArticleFormProps) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [category, setCategory] = useState(initialValues?.category || "Food");
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    input.current && input.current.focus();
  }, []);

  return (
    <form
      className="article-form"
      onSubmit={(e) => {
        e.preventDefault();
        const body = {
          id: initialValues?.id,
          title,
          description,
          category,
        };

        onSubmit(body);
      }}
    >
      <label htmlFor="article-title">Title</label>
      <input
        ref={input}
        type="text"
        id="article-title"
        value={title}
        placeholder="Enter title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <label htmlFor="article-description">Description</label>
      <textarea
        id="article-description"
        value={description}
        placeholder="Enter description"
        rows={5}
        cols={50}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <label htmlFor="article-category">Category</label>
      <select
        id="article-category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      >
        <option value="Food">Food</option>
        <option value="Technology">Technology</option>
        <option value="Sports">Sports</option>
        <option value="Science">Science</option>
      </select>

      <div className="article-form-buttons">
        <Button type="submit">Save</Button>

        <Button variant="secondary" onButtonClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

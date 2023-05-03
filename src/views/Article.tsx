import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Article as ArticleType } from "../types/article";
import axios from "axios";
import { delay } from "../helpers/delay";
import { SERVER_URL } from "../constants/url";
import "../styles/components/article.scss";
import { FaArrowLeft } from "react-icons/fa";

const useFetchArticle = (articleId: string) => {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<null | ArticleType>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await delay(1000);
        const { data } = await axios.get(`${SERVER_URL}${articleId}`);
        setArticle(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [articleId]);

  return { isLoading: loading, article };
};

export const Article = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isLoading, article } = useFetchArticle(articleId || "");
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <article className="article">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <h1 className="article-title">{article.title}</h1>

      <p className="article-description">{article.description}</p>

      <p className="article-category">{article.category}</p>
    </article>
  );
};

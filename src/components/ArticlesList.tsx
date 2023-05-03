import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Article } from "../types/article";
import { delay } from "../helpers/delay";
import { ArticleForm } from "./ArticleForm";
import { FaEdit, FaTrashAlt, FaArrowCircleRight } from "react-icons/fa";
import "../styles/components/articles-list.scss";

const API_URL = "http://localhost:3004/articles";

export const ArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [editedArticle, setEditedArticle] = useState<null | Article>(null);
  const [originalArticles, setOriginalArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await delay(1000);
        const { data } = await axios.get(API_URL);
        setArticles(data);
        setOriginalArticles(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const addNewArticle = async (article: Article) => {
    const newArticle = {
      ...article,
    };

    try {
      setIsLoading(true);
      await delay(1000);
      const { data } = await axios.post(API_URL, newArticle);
      console.log("data", data);

      setArticles([...articles, data]);
      setOriginalArticles([...originalArticles, data]);
      setIsLoading(false);
      setIsNewArticle(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const deleteArticle = async (id?: string) => {
    if (!id) {
      return;
    }

    try {
      setIsLoading(true);
      await delay(1000);
      await axios.delete(`${API_URL}/${id}`);
      const newArticles = articles.filter((article) => article.id !== id);
      setArticles(newArticles);
      setOriginalArticles(newArticles);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const filterArticles = (category: string) => {
    if (!category) {
      setFilteredArticles(originalArticles);
      return;
    }

    const filteredArticles = originalArticles.filter(
      (article) => article.category === category
    );
    setFilteredArticles(filteredArticles);
  };

  const resetArticles = async () => {
    try {
      setIsLoading(true);
      await delay(1000);
      const { data } = await axios.get(API_URL);
      setArticles(data);
      setOriginalArticles(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    setFilteredArticles(articles);
  }, [articles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-articles">
      <div className="articles-header">
        <h2 className="title"> Articles</h2>
        <div className="articles-header-actions">
          <button onClick={() => setIsNewArticle(true)}>Add new Article</button>
          <button onClick={() => resetArticles()}>
            <span>Reset</span>
          </button>
          <select onChange={(event) => filterArticles(event.target.value)}>
            <option value="">All categories</option>
            <option value="Food">Food</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Science">Science</option>
          </select>
        </div>
      </div>
      <ul className="article-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => {
            return (
              <li key={article.id}>
                <article className="article-card">
                  <h3 className="article-title">
                    {article.title.length > 22
                      ? `${article.title.slice(0, 22)}...`
                      : article.title}
                  </h3>
                  <div className="article-card-actions">
                    <Link to={`/articles/${article.id}`}>
                      <button className="button-read-more">
                        <FaArrowCircleRight className="icon" />
                      </button>
                    </Link>
                    <button onClick={() => setEditedArticle(article)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteArticle(article.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </article>
              </li>
            );
          })
        ) : (
          <div>No articles found</div>
        )}
      </ul>
      {isNewArticle && (
        <ArticleForm
          onCancel={() => {
            setIsNewArticle(false);
          }}
          onSubmit={(body) => {
            addNewArticle(body);
          }}
        />
      )}

      {editedArticle && (
        <ArticleForm
          onCancel={() => {
            setEditedArticle(null);
          }}
          onSubmit={async (body) => {
            try {
              setIsLoading(true);
              await delay(1000);
              const { data } = await axios.put(`${API_URL}/${body.id}`, body);
              const newArticle = articles.map((article) => {
                if (article.id === data.id) {
                  return data;
                }
                return article;
              });
              setArticles(newArticle);
              setOriginalArticles(newArticle);
              setIsLoading(false);
              setEditedArticle(null);
            } catch (error) {
              setIsLoading(false);
              console.log("error", error);
            }
          }}
          initialValues={editedArticle}
        />
      )}
    </div>
  );
};

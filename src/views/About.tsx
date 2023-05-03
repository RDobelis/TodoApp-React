import React from "react";
import "../styles/components/about.scss";

export const About = () => {
  return (
    <div className="about-page">
      <p>
        Welcome to this website! This platform is designed to help you stay
        organized and efficient by providing you with a Todo App and a section
        for adding and editing articles. The Todo App is built using React, a
        popular JavaScript library for building user interfaces, and Typescript,
        a programming language that adds static typing to JavaScript. This makes
        the app more reliable, easier to maintain, and reduces the likelihood of
        errors.
      </p>
      <p>
        The user interface is designed to be simple and intuitive, allowing you
        to quickly create and manage your to-do list. You can easily add new
        tasks, mark them as completed, and even set due dates and reminders to
        help you stay on track. In addition to the Todo App, there's a section
        for adding and editing articles.
      </p>
      <p>
        This section is built using React and SCSS, a powerful styling language
        for designing beautiful and responsive websites. You can easily create
        new articles, edit existing ones, and organize them into categories to
        make it easy for readers to find what they're looking for.
      </p>
      <p>
        The platform understands how important it is to stay organized and
        focused in today's busy world, which is why it was created to help you
        do just that. Whether you're looking to manage your to-do list, write
        articles, or just stay on top of your daily tasks, this platform is here
        to help. Thank you for choosing this website!
      </p>
    </div>
  );
};

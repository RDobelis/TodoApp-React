import React, { useState, useEffect } from "react";
import axios from "axios";

type Article = {
  id: number;
  title: string;
  description: string;
};

const delay = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

//const API_URL

export const TodoListFromServer = () => {

    return <div>TodoListFromServer</div>
};
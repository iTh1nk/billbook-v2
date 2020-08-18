import axios from "axios";

export function getNews() {
  return fetch("http://123.56.182.61:8070/api/v1/news/get");
}

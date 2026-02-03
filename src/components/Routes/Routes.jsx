
import Root from "../Root/Root";
import Home from "../pages/Home";
import QuizList from "../pages/QuizList";
import PlayQuiz from "../pages/PlayQuiz";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
 {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/category/:slug", element: <QuizList /> },
      { 
        path: "/play/:categorySlug", // এখানে পরিবর্তন করলাম, :quizId ফেলে দিয়েছি
        element: <PlayQuiz /> 
      },
    ],
  },
]);

export default router;

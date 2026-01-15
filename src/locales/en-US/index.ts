import common from "./common";
import components from "./components";
import pages from "./pages";

export default {
  "pages.not_found.title": "Oops! Page Not Found!",
  "pages.not_found.sub_title":
    "The page you are looking for might have been removed had its name changed or is temporarily unavailable.",
  "pages.not_found.back_home": "BACK HOME",
  "pages.not_found.go_back": "GO BACK",

  ...pages,
  ...components,
  ...common,
};

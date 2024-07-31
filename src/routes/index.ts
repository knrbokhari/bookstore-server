import { Express } from "express";
import authorsRoutesConfigure from "./authorRoutes";
import booksRoutesConfigure from "./bookRoutes";

const configure = (app: Express) => {
  authorsRoutesConfigure(app);
  booksRoutesConfigure(app);
};

export default configure;

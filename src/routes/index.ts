import { Express } from "express";
import authorsRoutesConfigure from "./authorRoutes";
import booksRoutesConfigure from "./bookRoutes";
import authRoutesConfigure from "./userRouthes";

const configure = (app: Express) => {
  authorsRoutesConfigure(app);
  booksRoutesConfigure(app);
  authRoutesConfigure(app);
};

export default configure;

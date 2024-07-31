import { Express } from "express";
import authorsRoutesConfigure from "./authorRoutes";

const configure = (app: Express) => {
  authorsRoutesConfigure(app);
};

export default configure;

import "./main.css";
import data from "@data/data.json";
import WebApp from "@components/web-app";
import WebJob from "@components/web-job";
import WebAppInterface from "@interfaces/web-app";

customElements.define("web-app", WebApp, { extends: "main" });
customElements.define("web-job", WebJob, { extends: "article" });

const webAppComment = document.createComment(" App ");
const webApp = <WebAppInterface>document.createElement("main", { is: "web-app" });
webApp.jobs = data;
document.body.prepend(webAppComment, webApp);
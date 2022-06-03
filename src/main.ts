import "./main.css";
import data from "@data/data.json";
import JobApp from "@components/job-app";
import JobCardList from "@components/job-card-list";
import JobFilterList from "@components/job-filter-list";
import JobAppInterface from "@interfaces/job-app";

customElements.define("job-card-list", JobCardList, { extends: "div" });
customElements.define("job-filter-list", JobFilterList, { extends: "div" });
customElements.define("job-app", JobApp, { extends: "main" });

const jobAppComment = document.createComment(" App ");
const jobApp = <JobAppInterface>document.createElement("main", { is: "job-app" });
jobApp.jobList = data;
jobApp.jobFilterList = [];
document.body.prepend(jobAppComment, jobApp);

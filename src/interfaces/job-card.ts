import Job from "@interfaces/job";

export default interface JobCardInterface extends HTMLElement {
  _job: Job | false;
  job: Job;
}
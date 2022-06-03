import Job from "@interfaces/job";

export default interface JobCardListInterface extends HTMLDivElement {
  _jobList: Job[] | false;
  jobList: Job[];
}
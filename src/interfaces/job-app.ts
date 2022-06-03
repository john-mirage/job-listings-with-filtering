import Job from "@interfaces/job";

export default interface JobAppInterface extends HTMLDivElement {
  _jobList: Job[] | false;
  _jobFilterList: string[] | false;
  jobList: Job[];
  jobFilterList: string[];
}
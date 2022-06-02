import Job from "@interfaces/job";

export default interface WebJobInterface extends HTMLElement {
  _job: Job;
  job: Job;
}
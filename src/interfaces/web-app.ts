import Job from "@interfaces/job";

export default interface WebAppInterface extends HTMLElement {
  _jobs: Job[];
  jobs: Job[];
}
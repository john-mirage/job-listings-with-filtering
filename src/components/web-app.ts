import Job from "@interfaces/job";
import WebJobInterface from "@interfaces/web-job";

class WebApp extends HTMLElement {
  _jobs: Job[] | false;
  jobElements?: HTMLElement[];
  jobFilterElement?: HTMLDivElement;
  jobFilterSectionElement: HTMLDivElement;
  jobListSectionElement: HTMLDivElement;

  constructor() {
    super();
    this._jobs = false;
    this.jobFilterSectionElement = document.createElement("div");
    this.jobListSectionElement = document.createElement("div");
  }

  get jobs() {
    if (this._jobs) {
      return this._jobs;
    } else {
      throw new Error("The jobs are not defined");
    }
  }

  set jobs(jobs) {
    this._jobs = jobs;
  }

  connectedCallback() {
    this.jobFilterSectionElement.classList.add("app__job-filter");
    this.jobListSectionElement.classList.add("app__job-list");
    this.classList.add("app");
    this.jobElements = this.jobs.map((job) => {
      const jobElement = this.createJobElement(job);
      this.displayJobElement(jobElement);
      return jobElement;
    });
    this.append(this.jobListSectionElement);
  }

  displayJobElement(jobElement: HTMLElement) {
    this.jobListSectionElement.append(jobElement);
  }

  createJobFilterElement() {
    if (!this.jobFilterElement) {
      this.jobFilterElement = document.createElement("div");
      const tagsElement = document.createElement("div");
      const clearButtonElement = document.createElement("button");
      this.jobFilterElement.classList.add("job-filter");
      tagsElement.classList.add("job-filter__tags");
      clearButtonElement.classList.add("job-filter__button");
      this.jobFilterElement.append(tagsElement, clearButtonElement);
      return this.jobFilterElement;
    } else {
      return this.jobFilterElement;
    }
  }

  createFilterTagElement() {

  }

  createJobElement(job: Job) {
    const jobElement = <WebJobInterface>document.createElement("article", { is: "web-job"});
    jobElement.job = job;
    return jobElement;
  }
}

export default WebApp;
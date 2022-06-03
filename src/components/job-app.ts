import Job from "@interfaces/job";
import JobFilterListInterface from "@interfaces/job-filter-list";
import JobCardListInterface from "@interfaces/job-card-list";

class JobApp extends HTMLElement {
  _jobList: Job[] | false;
  _jobFilterList: string[] | false;
  initialCall: boolean;
  jobCardListElement: JobCardListInterface;
  jobFilterListElement: JobFilterListInterface;

  constructor() {
    super();
    this._jobList = false;
    this._jobFilterList = false;
    this.initialCall = true;
    this.jobCardListElement = <JobCardListInterface>document.createElement("div", { is: "job-card-list" });
    this.jobFilterListElement = <JobFilterListInterface>document.createElement("div", { is: "job-filter-list" });
  }

  get jobList() {
    if (this._jobList) {
      return this._jobList;
    } else {
      throw new Error("The job list is not defined");
    }
  }

  get jobFilterList() {
    if (this._jobFilterList) {
      return this._jobFilterList;
    } else {
      throw new Error("The job filter list is not defined");
    }
  }

  set jobList(jobList) {
    this._jobList = jobList;
    this.jobCardListElement.jobList = jobList;
  }

  set jobFilterList(jobFilterList) {
    this._jobFilterList = jobFilterList;
    this.jobFilterListElement.jobFilterList = jobFilterList;
    this.handleJobFilterListVisibility();
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("page__container");
      this.append(this.jobCardListElement);
      this.initialCall = false;
    }
    this.addEventListener("add-job-filter", this.addJobFilter);
    this.addEventListener("delete-job-filter", this.deleteJobFilter);
    this.addEventListener("clear-job-filter-list", this.clearJobFilterList);
  }

  disconnectedCallback() {
    this.removeEventListener("add-job-filter", this.addJobFilter);
    this.removeEventListener("delete-job-filter", this.deleteJobFilter);
    this.removeEventListener("clear-job-filter-list", this.clearJobFilterList);
  }

  addJobFilter(event: Event) {
    const filterToAdd = (<CustomEvent>event).detail.filter;
    if (!this.jobFilterList.includes(filterToAdd)) {
      this.jobFilterList = [...this.jobFilterList, filterToAdd];
      this.filterJobList();
    }
  }

  deleteJobFilter(event: Event) {
    const filterToDelete = (<CustomEvent>event).detail.filter;
    if (this.jobFilterList.includes(filterToDelete)) {
      this.jobFilterList = this.jobFilterList.filter((filter) => filter !== filterToDelete);
      this.filterJobList();
    }
  }

  clearJobFilterList() {
    this.jobFilterList = [];
    this.filterJobList();
  }

  filterJobList() {
    if (this.jobFilterList.length > 0) {
      this.jobCardListElement.jobList = this.jobList.filter((job) => {
        if (this.jobFilterList.includes(job.role)) return true;
        if (this.jobFilterList.includes(job.level)) return true;
        if (this.jobFilterList.filter((filter) => job.languages.includes(filter)).length > 0) return true;
        return this.jobFilterList.filter((filter) => job.tools.includes(filter)).length > 0;
      });
    } else {
      this.jobCardListElement.jobList = this.jobList;
    }
  }

  handleJobFilterListVisibility() {
    if (this.jobFilterList.length > 0 && !this.jobFilterListElement.isConnected) {
      this.prepend(this.jobFilterListElement);
    } else if (this.jobFilterList.length <= 0 && this.jobFilterListElement.isConnected) {
      this.removeChild(this.jobFilterListElement);
    }
  }
}

export default JobApp;
import Job from "@interfaces/job";

class JobCardList extends HTMLDivElement {
  _jobList: Job[] | false;
  initialCall: boolean;

  constructor() {
    super();
    this._jobList = false;
    this.initialCall = true;
  }

  get jobList() {
    if (this._jobList) {
      return this._jobList;
    } else {
      throw new Error("The job card list is not defined");
    }
  }

  set jobList(jobList: Job[]) {
    this._jobList = jobList;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("card-list");
      this.initialCall = false;
    }
  }
}

export default JobCardList;
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
    this.displayJobCards();
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("card-list");
      this.initialCall = false;
    }
  }

  displayJobCards() {
    this.innerHTML = "";
    this.jobList.forEach((job) => {
      const jobCard = document.createElement("article", { is: "job-card" });
      jobCard.job = job;
      this.append(jobCard);
    });
  }
}

export default JobCardList;
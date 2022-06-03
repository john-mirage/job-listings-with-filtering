class JobFilterList extends HTMLDivElement {
  _jobFilterList: string[] | false;
  initialCall: boolean;

  constructor() {
    super();
    this._jobFilterList = false;
    this.initialCall = true;
  }

  get jobFilterList() {
    if (this._jobFilterList) {
      return this._jobFilterList;
    } else {
      throw new Error("The job filter list is not defined");
    }
  }

  set jobFilterList(jobFilterList: string[]) {
    this._jobFilterList = jobFilterList;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("filter-list");
      this.initialCall = false;
    }
  }
}

export default JobFilterList;
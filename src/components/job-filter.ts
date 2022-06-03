class JobFilter extends HTMLElement {
  _jobFilter: string | false;

  constructor() {
    super();
    this._jobFilter = false;
  }

  connectedCallback() {
    this.classList.add("filter");
  }
}

export default JobFilter;
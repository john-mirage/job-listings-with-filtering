import Job from "@interfaces/job";

class JobCard extends HTMLElement {
  _job: Job | false;
  logoSectionElement: HTMLDivElement;
  infoSectionElement: HTMLDivElement;
  tagsSectionElement: HTMLDivElement;
  logoElement: HTMLImageElement;
  infoHeaderElement: HTMLDivElement;
  infoFooterElement: HTMLDivElement;
  companyElement: HTMLAnchorElement;
  positionElement: HTMLParagraphElement;
  postedAtElement: HTMLParagraphElement;
  contractElement: HTMLParagraphElement;
  locationElement: HTMLParagraphElement;
  dividerElement: HTMLDivElement;

  constructor() {
    super();
    this._job = false;
    this.logoSectionElement = document.createElement("div");
    this.infoSectionElement = document.createElement("div");
    this.tagsSectionElement = document.createElement("div");
    this.logoElement = document.createElement("img");
    this.infoHeaderElement = document.createElement("div");
    this.infoFooterElement = document.createElement("div");
    this.companyElement = document.createElement("a");
    this.positionElement = document.createElement("p");
    this.postedAtElement = document.createElement("p");
    this.contractElement = document.createElement("p");
    this.locationElement = document.createElement("p");
    this.dividerElement = document.createElement("div");
    this.logoSectionElement.classList.add("job__section", "job__section--logo");
    this.infoSectionElement.classList.add("job__section", "job__section--info");
    this.tagsSectionElement.classList.add("job__section", "job__section--tags");
    this.logoElement.classList.add("job__logo");
    this.infoHeaderElement.classList.add("job__row");
    this.infoFooterElement.classList.add("job__row");
    this.companyElement.classList.add("job__company");
    this.positionElement.classList.add("job__position");
    this.postedAtElement.classList.add("job__posted-at");
    this.contractElement.classList.add("job__contract");
    this.locationElement.classList.add("job__location");
    this.dividerElement.classList.add("job__divider");
    this.displayTag = this.displayTag.bind(this);
  }

  get job() {
    if (this._job) {
      return this._job;
    } else {
      throw new Error("The job is not defined");
    }
  }

  set job(job: Job) {
    this._job = job;
  }

  connectedCallback() {
    this.classList.add("job");
    this.logoElement.setAttribute("src", this.job.logo);
    this.logoElement.setAttribute("alt", "Company logo");
    this.companyElement.textContent = this.job.company;
    this.positionElement.textContent = this.job.position;
    this.postedAtElement.textContent = this.job.postedAt;
    this.contractElement.textContent = this.job.contract;
    this.locationElement.textContent = this.job.location;
    this.displayTag(this.job.role);
    this.displayTag(this.job.level);
    this.job.languages.forEach(this.displayTag);
    this.job.tools.forEach(this.displayTag);
    this.logoSectionElement.append(this.logoElement);
    this.infoHeaderElement.append(this.companyElement);
    if (this.job.new) this.displayBadge("new");
    if (this.job.featured) this.displayBadge("featured");
    this.infoFooterElement.append(this.postedAtElement, this.createDot(), this.contractElement, this.createDot(), this.locationElement);
    this.infoSectionElement.append(this.infoHeaderElement, this.positionElement, this.infoFooterElement);
    this.append(this.logoSectionElement, this.infoSectionElement, this.dividerElement, this.tagsSectionElement);
  }

  createDot() {
    const dotElement = document.createElement("div");
    dotElement.classList.add("job__dot");
    return dotElement;
  }

  displayBadge(name: string) {
    const badgeElement = document.createElement("button");
    badgeElement.classList.add("job__badge", `job__badge--${name}`);
    badgeElement.textContent = name;
    this.infoHeaderElement.append(badgeElement);
  }

  displayTag(name: string) {
    const tagElement = document.createElement("button");
    tagElement.classList.add("job__tag");
    tagElement.textContent = name;
    this.tagsSectionElement.append(tagElement);
    tagElement.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("add-job-filter", { detail: { filter: name }, bubbles: true }));
    });
  }
}

export default JobCard;
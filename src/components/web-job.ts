import Job from "@interfaces/job";

class WebJob extends HTMLElement {
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
    this.logoElement.setAttribute("src", this.job.logo);
    this.logoElement.setAttribute("alt", "Company logo");
    this.companyElement.textContent = this.job.company;
    this.positionElement.textContent = this.job.position;
    this.postedAtElement.textContent = this.job.postedAt;
    this.contractElement.textContent = this.job.contract;
    this.locationElement.textContent = this.job.location;
    this.logoSectionElement.append(this.logoElement);
    this.infoHeaderElement.append(this.companyElement);
    if (this.job.new) {
      const newBadgeElement = this.createBadge("new");
      this.infoHeaderElement.append(newBadgeElement);
    }
    if (this.job.featured) {
      const featuredBadgeElement = this.createBadge("featured");
      this.infoHeaderElement.append(featuredBadgeElement);
    }
    const leftDotElement = this.createDot();
    const rightDotElement = this.createDot();
    this.infoFooterElement.append(this.postedAtElement, leftDotElement, this.contractElement, rightDotElement, this.locationElement);
    this.infoSectionElement.append(this.infoHeaderElement, this.positionElement, this.infoFooterElement);
    const roleTagElement = this.createTag(this.job.role);
    const levelTagElement = this.createTag(this.job.level);
    this.tagsSectionElement.append(roleTagElement, levelTagElement);
    this.job.languages.forEach((language) => {
      const languageTagElement = this.createTag(language);
      this.tagsSectionElement.append(languageTagElement);
    });
    this.job.tools.forEach((tool) => {
      const toolTagElement = this.createTag(tool);
      this.tagsSectionElement.append(toolTagElement);
    });
    this.append(this.logoSectionElement, this.infoSectionElement, this.dividerElement, this.tagsSectionElement);
  }

  createDot() {
    const dotElement = document.createElement("div");
    dotElement.classList.add("job__dot");
    return dotElement;
  }

  createBadge(name: string) {
    const badgeElement = document.createElement("button");
    badgeElement.classList.add("job__badge", `job__badge--${name}`);
    badgeElement.textContent = name;
    return badgeElement;
  }

  createTag(name: string) {
    const tagElement = document.createElement("button");
    tagElement.classList.add("job__tag");
    tagElement.textContent = name;
    return tagElement;
  }
}

export default WebJob;
const articles = [
  {
    title: "SLOs That Drive Product Reliability",
    summary: "How to build meaningful service level objectives tied to user journeys.",
    author: "Avery Patel",
    date: "2026-01-17",
    topic: "slo error budgets"
  },
  {
    title: "Incident Management: First 30 Minutes Playbook",
    summary: "A practical incident response routine for high-severity outages.",
    author: "Avery Patel",
    date: "2025-12-03",
    topic: "incident management"
  },
  {
    title: "Modern Monitoring with Prometheus & Grafana",
    summary: "Designing metrics, dashboards, and alerts for production services.",
    author: "Avery Patel",
    date: "2025-10-29",
    topic: "monitoring observability"
  },
  {
    title: "OpenTelemetry for Distributed Tracing",
    summary: "Collect, export, and analyze traces across microservices.",
    author: "Avery Patel",
    date: "2025-08-12",
    topic: "opentelemetry tracing"
  }
];

const caseStudies = [
  {
    title: "Reducing Checkout Errors by 42%",
    problem: "High 5xx rates during flash sales degraded user experience.",
    solution: "Implemented autoscaling policies, queue buffering, and burn-rate alerts.",
    results: "Availability increased from 99.3% to 99.92% over two quarters.",
    lessons: "Capacity testing and clear runbooks are as important as tooling."
  },
  {
    title: "From Alert Fatigue to Actionable Signals",
    problem: "On-call engineers received over 600 alerts/week with low signal quality.",
    solution: "Consolidated alert rules around SLO burn-rate and service dependencies.",
    results: "Alert volume dropped 68%; MTTR improved from 49m to 21m.",
    lessons: "Alerting should map to customer pain, not raw infrastructure noise."
  }
];

const tools = [
  {
    name: "Prometheus",
    description: "Metrics collection and alert rule evaluation.",
    note: "Use recording rules for high-cardinality queries."
  },
  {
    name: "Grafana",
    description: "Operational dashboards and on-call visualization.",
    note: "Build dashboard panels by user journey, not by host."
  },
  {
    name: "Terraform",
    description: "Infrastructure as code for repeatable reliability setup.",
    note: "Guardrail modules reduce drift and improve recovery confidence."
  },
  {
    name: "OpenTelemetry",
    description: "Standardized telemetry pipelines for metrics, logs, and traces.",
    note: "Consistent semantic conventions accelerate root-cause analysis."
  },
  {
    name: "Firebase Crashlytics",
    description: "Mobile crash reporting for reliability across client apps.",
    note: "Use crash-free session goals as an SLI input for app stability."
  }
];

const fallbackNews = [
  {
    title: "Google SRE Book Updates",
    source: "Google Cloud Blog",
    url: "https://cloud.google.com/blog",
    date: "2026-02-01"
  },
  {
    title: "CNCF Observability Trends",
    source: "CNCF",
    url: "https://www.cncf.io/blog/",
    date: "2026-01-25"
  },
  {
    title: "PagerDuty Incident Response Patterns",
    source: "PagerDuty Blog",
    url: "https://www.pagerduty.com/blog/",
    date: "2026-01-14"
  }
];

function renderArticles(list) {
  const container = document.getElementById("articlesGrid");
  const articleCount = document.getElementById("articleCount");
  container.innerHTML = list
    .map(
      (article) => `
      <article class="card">
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <p class="article-meta">By ${article.author} • ${new Date(article.date).toDateString()}</p>
        <p class="item-meta">Topics: ${article.topic}</p>
      </article>
    `
    )
    .join("");
  articleCount.textContent = `${list.length} article(s)`;
}

function renderCaseStudies() {
  const container = document.getElementById("caseStudiesGrid");
  container.innerHTML = caseStudies
    .map(
      (c) => `
      <article class="card">
        <h3>${c.title}</h3>
        <p><strong>Problem:</strong> ${c.problem}</p>
        <p><strong>Solution:</strong> ${c.solution}</p>
        <p><strong>Results:</strong> ${c.results}</p>
        <p><strong>Lessons:</strong> ${c.lessons}</p>
      </article>
    `
    )
    .join("");
}

function renderTools() {
  const container = document.getElementById("toolsGrid");
  container.innerHTML = tools
    .map(
      (tool) => `
      <article class="card">
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <p class="item-meta">${tool.note}</p>
      </article>
    `
    )
    .join("");
}

function renderNews(newsItems) {
  const container = document.getElementById("newsGrid");
  container.innerHTML = newsItems
    .map(
      (item) => `
      <article class="card">
        <h3>${item.title}</h3>
        <p class="item-meta">${item.source} • ${new Date(item.date).toDateString()}</p>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer">Read source</a>
      </article>
    `
    )
    .join("");
}

async function fetchNews() {
  const status = document.getElementById("newsStatus");
  status.textContent = "Refreshing...";
  try {
    const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=3");
    if (!response.ok) throw new Error("News API unavailable");
    const data = await response.json();
    const mapped = data.results.map((item) => ({
      title: item.title,
      source: item.news_site,
      url: item.url,
      date: item.published_at
    }));
    renderNews(mapped);
    status.textContent = "Updated from live API";
  } catch (error) {
    renderNews(fallbackNews);
    status.textContent = "Using fallback news (API unavailable)";
  }
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    const term = input.value.toLowerCase().trim();
    const filtered = articles.filter((article) => {
      const haystack = `${article.title} ${article.summary} ${article.topic}`.toLowerCase();
      return haystack.includes(term);
    });
    renderArticles(filtered);
  });
}

function setupTheme() {
  const button = document.getElementById("themeToggle");
  const current = localStorage.getItem("theme");
  if (current === "dark") document.body.classList.add("dark");
  button.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
    button.textContent = dark ? "☀️" : "🌙";
  });
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const response = document.getElementById("formResponse");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const entry = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      createdAt: new Date().toISOString()
    };
    const feedback = JSON.parse(localStorage.getItem("feedback") || "[]");
    feedback.push(entry);
    localStorage.setItem("feedback", JSON.stringify(feedback, null, 2));
    form.reset();
    response.textContent = "Message received. Thank you for the feedback!";
  });
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });
}

function init() {
  renderArticles(articles);
  renderCaseStudies();
  renderTools();
  renderNews(fallbackNews);
  setupSearch();
  setupTheme();
  setupContactForm();
  setupMobileNav();
  fetchNews();
  document.getElementById("refreshNews").addEventListener("click", fetchNews);
  document.getElementById("year").textContent = new Date().getFullYear();
  if (window.hljs) hljs.highlightAll();
}

init();

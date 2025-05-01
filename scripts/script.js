import {
  annotate,
  annotationGroup,
} from "https://unpkg.com/rough-notation?module";
// Or using unpkg
// import { annotate } from 'https://unpkg.com/rough-notation?module';

const dev = document.getElementById("dev");
const cy = document.getElementById("cy");
const cs = document.querySelector("#cs");
const googlecert = document.getElementById("googlecert");
const THMcert = document.getElementById("THMcert");
const ctf = document.getElementById("ctf");
const internships = document.getElementById("internships");
const jobs = document.getElementById("jobs");

const a1 = annotate(cy, { type: "underline", color: "#7842f5" });
const a2 = annotate(dev, { type: "underline", color: "#7842f5" });
// const a3 = annotate(cs,{type:'highlight', color: '#9A73F3'});
const a3 = annotate(cs, {
  type: "highlight",
  color: "#9A73F3",
  multiline: false,
});
const a4 = annotate(googlecert, { type: "highlight", color: "#736586" });
const a5 = annotate(THMcert, { type: "highlight", color: "#736586" });
const a6 = annotate(ctf, { type: "underline", color: "#7842f5" });

const a7 = annotate(internships, { type: "box", color: "#7842f5" });

const a8 = annotate(jobs, { type: "box", color: "#7842f5" });

const ag = annotationGroup([a1, a2, a3, a4, a5, a6, a7, a8]);

// Function to handle annotations based on screen size
function handleAnnotations() {
  if (window.innerWidth <= 768) {
    ag.hide();
  } else {
    ag.show();
  }
}

// Initial check
handleAnnotations();

// Add resize event listener
window.addEventListener("resize", handleAnnotations);

// Mobile menu functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

async function loadProjects() {
  try {
    const response = await fetch("./JSON/projects.json");
    const data = await response.json();

    // Store all projects in localStorage for access on project details page
    localStorage.setItem(
      "allProjects",
      JSON.stringify({
        featured: data.featured,
        recent: data.recent,
      })
    );

    // Load featured projects (first two)
    const featuredContainer = document.getElementById("featured-projects");
    const featuredProjects = data.featured.slice(-2);
    featuredProjects.forEach((project) => {
      featuredContainer.innerHTML += createProjectCard(project);
    });

    // Load recent projects (first two)
    const recentContainer = document.getElementById("recent-projects");
    const recentProjects = data.recent.slice(-2);
    recentProjects.forEach((project) => {
      recentContainer.innerHTML += createProjectCard(project);
    });

    // Update view more button to show all projects
    const viewMoreBtn = document.querySelector(".view-more-btn");
    viewMoreBtn.onclick = function () {
      // Clear existing projects
      featuredContainer.innerHTML = "";
      recentContainer.innerHTML = "";

      // Show all featured projects
      data.featured.forEach((project) => {
        featuredContainer.innerHTML += createProjectCard(project);
      });

      // Show all recent projects
      data.recent.forEach((project) => {
        recentContainer.innerHTML += createProjectCard(project);
      });

      // Hide the view more button after showing all projects
      viewMoreBtn.style.display = "none";
    };
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

function createProjectCard(project) {
  return `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="project-details.html?id=${project.id}" class="view-project">View Details</a>
            </div>
        </div>
    `;
}

// Load projects when the page loads
document.addEventListener("DOMContentLoaded", loadProjects);

// Handle project details page
if (window.location.pathname.includes("project-details.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");

    if (projectId) {
      const allProjects = JSON.parse(localStorage.getItem("allProjects"));
      const project = [...allProjects.featured, ...allProjects.recent].find(
        (p) => p.id.toString() === projectId
      );

      if (project) {
        document.getElementById("projectTitle").textContent = project.title;
        document.getElementById("projectImage").src = project.image;
        document.getElementById("projectOverview").textContent =
          project.description;

        if (project.features) {
          const featuresHtml = project.features
            .map((feature) => `<li>${feature}</li>`)
            .join("");
          document.getElementById("projectFeatures").innerHTML = featuresHtml;
        }

        if (project.stack) {
          const stackHtml = project.stack
            .map((tech) => `<span class="tech-tag">${tech}</span>`)
            .join("");
          document.getElementById("projectStack").innerHTML = stackHtml;
        }

        if (project.implementation) {
          document.getElementById("projectImplementation").textContent =
            project.implementation;
        }

        if (project.date) {
          document.getElementById(
            "projectDate"
          ).textContent = `Completed in ${project.date}`;
        }
      }
    }
  });
}

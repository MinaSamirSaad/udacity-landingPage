const sections = Array.from(document.querySelectorAll("section"));
const navMenu = document.querySelector("#navbar__list");

function creatLists() {
  // this fragment to add all the items inside it and then add the fragment inside the navMenu at once to avoid the repainting.
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < sections.length; i++) {
    selectorName = sections[i].getAttribute("data-nav");
    selectorLink = sections[i].getAttribute("id");
    listElement = document.createElement("li");

    listElement.addEventListener("click", onClickHandler(i));

    listElement.innerHTML = `<a class="menu__link" data-nav="${selectorLink}" href="#">${selectorName}</a>`;
    fragment.appendChild(listElement);
  }

  // add the fragment in the navMenu at once and repaint at once
  navMenu.appendChild(fragment);
  // to add first link activated at the beginning of opining the page
  navMenu.children[0].querySelector("a").classList.add("active-link");
}

// create Closures so I can access the lexical scope (parent function).
// Ex: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
const onClickHandler = (index) => (e) => {
  e.preventDefault(); // to prevent the default behavior of the anchor element
  const sectionTop = sections[index].offsetTop;
  window.scrollTo({
    behavior: "smooth",
    top: sectionTop,
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      let activeLink = navMenu.querySelector(`[data-nav=${element.id}]`);
      if (entry.isIntersecting) {
        if (!activeLink.classList.contains("active-link")) {
          activeLink.classList.add("active-link");
        }
        if (!element.classList.contains("your-active-class")) {
          element.classList.add("your-active-class");
        }
      } else {
        activeLink.classList.remove("active-link");
        element.classList.remove("your-active-class");
      }
    });
  },
  {
    // when 50% of the target is visible within the element specified by the root
    threshold: 0.5,
  }
);

function toggleActiveState() {
  sections.forEach((section) => {
    observer.observe(section);
  });
}

creatLists();
window.addEventListener("scroll", toggleActiveState);

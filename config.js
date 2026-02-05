// config.js
export default {

  userDataDir: "/Users/wilson/selenium-profile",
  profileDirectory: null,


  // ====== TARGET PAGE ======
  baseUrl: "https://alueducation.instructure.com/courses/2545/assignments",

  // ====== SELECTORS (Canvas LMS) ======
  selectors: {
    assignmentItem: "li.assignment",
    name: "a.ig-title",
    dueDate: "div.assignment-date-due span[aria-hidden='true']",
    grade: "span.grade-display"
  },

  // ====== OUTPUT ======
  outputFile: "assignments.json"
};
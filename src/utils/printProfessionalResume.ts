// Utility to print or export the exact Professional Resume format via an isolated print frame

export function printProfessionalResume(): void {
  const resumeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume - Mohammed Kaif Abdul Salam Tungekar</title>
  <style>
    @page {
      size: letter;
      margin: 0.5in 0.6in;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      line-height: 1.35;
      font-size: 10.5pt;
    }
    .header {
      text-align: center;
      margin-bottom: 12px;
      border-bottom: 1.5px solid #1f2937;
      padding-bottom: 8px;
    }
    .name {
      font-size: 19pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #000000;
      margin-bottom: 4px;
    }
    .contact-line {
      font-size: 9.5pt;
      color: #374151;
    }
    .contact-line a {
      color: #1d4ed8;
      text-decoration: none;
    }
    .contact-line a:hover {
      text-decoration: underline;
    }
    .section {
      margin-top: 10px;
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #111827;
      border-bottom: 1px solid #9ca3af;
      padding-bottom: 2px;
      margin-bottom: 6px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 700;
      font-size: 10pt;
    }
    .item-sub {
      font-style: italic;
      color: #374151;
      font-size: 9.5pt;
      margin-bottom: 3px;
    }
    .item-date {
      font-weight: 600;
      color: #374151;
      font-size: 9pt;
    }
    ul {
      margin-left: 18px;
      margin-top: 2px;
      margin-bottom: 6px;
    }
    li {
      margin-bottom: 2.5px;
      font-size: 9.5pt;
      color: #1f2937;
    }
    .tech-stack {
      font-size: 9pt;
      margin-top: 2px;
      color: #374151;
    }
    .skill-category {
      font-size: 9.5pt;
      margin-bottom: 3px;
      line-height: 1.35;
    }
    .skill-name {
      font-weight: 700;
      color: #111827;
    }
    .edu-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      font-size: 9.5pt;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>

  <div class="header">
    <div class="name">Mohammed Kaif Abdul Salam Tungekar</div>
    <div class="contact-line">
      +91 9820293676 &nbsp;|&nbsp; Borivali, Mumbai, India &nbsp;|&nbsp; 
      <a href="mailto:mohammedkaift@gmail.com">mohammedkaift@gmail.com</a> &nbsp;|&nbsp; 
      <a href="https://www.linkedin.com/in/mohammedkaiftungekar/" target="_blank">LinkedIn</a> &nbsp;|&nbsp; 
      <a href="https://github.com/mohammedkaif777" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- EXPERIENCE -->
  <div class="section">
    <div class="section-title">Experience</div>
    <div class="item-header">
      <span>Systems Engineer, Tata Consultancy Services (TCS)</span>
      <span class="item-date">Mumbai, India | Apr 2026 – Present</span>
    </div>
    <ul>
      <li>Working as a Java Full Stack Developer on a data-intensive lab application used globally by a leading US-based client (client name withheld per NDA/confidentiality policy).</li>
      <li>Building and maintaining backend services using Java, Spring Boot, and a microservices architecture deployed on AWS.</li>
      <li>Contributing to a system that handles continuous, high-volume data flow, focusing on reliability, scalability, and performance of services.</li>
      <li>Collaborating with a distributed, cross-functional team following Agile practices to deliver features and bug fixes for a globally-used platform.</li>
    </ul>
  </div>

  <!-- PROJECTS -->
  <div class="section">
    <div class="section-title">Projects</div>
    
    <div class="item-header">
      <span>API Dependency Intelligence — Breaking-Change Detection for Microservices</span>
    </div>
    <ul>
      <li>Built a system to register services’ OpenAPI specs, construct a live API dependency graph, and diff specs to classify changes as breaking or non-breaking (with schema composition changes flagged for review).</li>
      <li>Combined graph traversal (blast-radius analysis, cycle detection) with spec diffs to generate per-consumer impact reports with severity classification.</li>
      <li>Architected multi-tenant data isolation at the repository layer, enforcing org-scoped queries structurally.</li>
      <div class="tech-stack"><strong>Tech stack:</strong> Java, Spring Boot, React, PostgreSQL, REST, OpenAPI 3.x.</div>
    </ul>

    <div class="item-header" style="margin-top: 6px;">
      <span>AnnaMrita — IoT-based Food Spoilage Detection System</span>
    </div>
    <ul>
      <li>Built an IoT-based food spoilage detection system (ESP32 with gas, temperature, and moisture sensors) that transmits real-time data to a server and uses a machine learning model to predict food shelf life.</li>
      <li>Implemented Arduino firmware for sensor data acquisition and calibrated spoilage thresholds from fresh-to-spoiled sample data.</li>
      <div class="tech-stack"><strong>Tech stack:</strong> HTML/CSS, JavaScript, PHP, XAMPP, MySQL, Arduino IDE, Machine Learning.</div>
    </ul>
  </div>

  <!-- SKILLS -->
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skill-category"><span class="skill-name">AI/ML:</span> LLM APIs, Prompt Engineering, Multimodal/Vision Extraction, Lightweight RAG, Conversational Intent Parsing</div>
    <div class="skill-category"><span class="skill-name">Programming Languages:</span> Java, Python, JavaScript, HTML/CSS, MySQL, PostgreSQL</div>
    <div class="skill-category"><span class="skill-name">Frameworks:</span> Spring Boot, React JS, Node.js/Express, Tailwind CSS</div>
    <div class="skill-category"><span class="skill-name">Cloud & Architecture:</span> AWS, Microservices</div>
    <div class="skill-category"><span class="skill-name">Tools:</span> Git, GitHub, VS Code, Postman, Linux</div>
    <div class="skill-category"><span class="skill-name">Languages & Soft Skills:</span> English, Hindi, Marathi; Collaboration, Communication, Planning, Teamwork, Time Management, Leadership, Quick Learner</div>
  </div>

  <!-- EDUCATION -->
  <div class="section">
    <div class="section-title">Education</div>
    <div class="edu-row">
      <div>
        <strong>B.E. in Information Technology</strong>, Shree L.R. Tiwari College of Engineering
      </div>
      <div><strong>2021 – 2025</strong> | CGPA: 8.7 / 10</div>
    </div>
    <div class="edu-row">
      <div>
        <strong>HSC (Science)</strong>, Bi-focal Computer Science, Elphinstone College
      </div>
      <div><strong>2019 – 2021</strong> | 80.6%</div>
    </div>
    <div class="edu-row">
      <div>
        <strong>SSC</strong>, St. Francis D'Assisi High School
      </div>
      <div><strong>2018 – 2019</strong> | 82.6%</div>
    </div>
  </div>

  <!-- CERTIFICATIONS -->
  <div class="section">
    <div class="section-title">Certifications</div>
    <div style="font-size: 9.5pt;">
      <strong>Claude Certified Developer — Foundations (CCDV-F)</strong>, Anthropic (2026)
    </div>
  </div>

  <!-- ACHIEVEMENTS -->
  <div class="section">
    <div class="section-title">Achievements</div>
    <div style="font-size: 9.5pt;">
      <strong>Design Patent Granted</strong>, Government of India (Jul 2026) — for “AnnaMrita,” an IoT-based food spoilage detection system.
    </div>
  </div>

</body>
</html>
  `;

  // Create an isolated hidden iframe to run native window.print() on the clean resume
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  iframe.style.zIndex = '-9999';
  iframe.setAttribute('title', 'Resume Print Frame');

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!doc) {
    // Fallback: open a new print window if iframe document is unavailable
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(resumeHtml);
      win.document.close();
      win.focus();
      win.print();
    }
    return;
  }

  doc.open();
  doc.write(resumeHtml);
  doc.close();

  // Wait for resources to render, then invoke print dialog
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      window.print();
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);
    }
  }, 250);
}

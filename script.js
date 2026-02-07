const jobs = [
    {
        id: 1,
        title: "Senior Frontend Engineer",
        company: "Aura Systems",
        location: "Remote",
        salary: "$2900 - $3500",
        type: "Full-time",
        tags: ["React", "TypeScript", "Tailwind"],
        logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Aura"
    },
    {
        id: 2,
        title: "Backend Developer (Go)",
        company: "Terra Core",
        location: "San Francisco, CA",
        salary: "$120k - $160k",
        type: "Full-time",
        tags: ["Go", "Kubernetes", "PostgreSQL"],
        logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Terra"
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "Synapse Networks",
        location: "New York, NY",
        salary: "$110k - $150k",
        type: "Full-time",
        tags: ["Next.js", "Node.js", "MongoDB"],
        logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Synapse"
    },
    {
        id: 4,
        title: "DevOps Specialist",
        company: "Orbital Dynamics",
        location: "Remote",
        salary: "$130k - $170k",
        type: "Contract",
        tags: ["AWS", "Terraform", "CI/CD"],
        logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Orbital"
    }
];

const modules = {
    dsa: {
        title: "Data Structures & Algorithms",
        description: "Master the building blocks of efficient software and ace top tech interviews.",
        lessons: [
            { id: 1, title: "Arrays & Hashing", duration: "2h", status: "Start" },
            { id: 2, title: "Two Pointers & Slidng Window", duration: "1.5h", status: "Start" },
            { id: 3, title: "Linked Lists", duration: "1h", status: "Start" },
            { id: 4, title: "Trees & Graphs", duration: "4h", status: "Start" },
            { id: 5, title: "Dynamic Programming", duration: "6h", status: "Start" }
        ]
    },
    os: {
        title: "Operating Systems",
        description: "Understand the core concepts of how computers manage hardware and software.",
        lessons: [
            { id: 1, title: "Processes & threads", duration: "2h", status: "Start" },
            { id: 2, title: "CPU Scheduling", duration: "2h", status: "Start" },
            { id: 3, title: "Memory Management", duration: "3h", status: "Start" },
            { id: 4, title: "Concurrency & Deadlocks", duration: "3h", status: "Start" }
        ]
    },
    dbms: {
        title: "Database Management Systems",
        description: "Design and optimize databases for scale and reliability.",
        lessons: [
            { id: 1, title: "Relational Modeling & SQL", duration: "3h", status: "Start" },
            { id: 2, title: "Normalization", duration: "1.5h", status: "Start" },
            { id: 3, title: "Indexing & Hashing", duration: "2h", status: "Start" },
            { id: 4, title: "Transactions & ACID", duration: "2h", status: "Start" }
        ]
    },
    networking: {
        title: "Computer Networks",
        description: "Master the protocols that power the internet.",
        lessons: [
            { id: 1, title: "OSI Model & TCP/IP", duration: "2h", status: "Start" },
            { id: 2, title: "HTTP/HTTPS Protocols", duration: "1.5h", status: "Start" },
            { id: 3, title: "Network Security", duration: "2h", status: "Start" }
        ]
    }
};

function showSection(sectionId, filter = '') {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }

    if (sectionId === 'jobs') {
        renderJobs(filter);
    }
}

function renderJobs(filter = '') {
    const jobGrid = document.getElementById('jobGrid');
    const filteredJobs = filter
        ? jobs.filter(j => j.title.toLowerCase().includes(filter.toLowerCase()) ||
            j.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())))
        : jobs;

    jobGrid.innerHTML = filteredJobs.map(job => `
        <div class="job-card">
            <img src="${job.logo}" alt="${job.company}" class="company-logo">
            <div class="job-info">
                <h3>${job.title}</h3>
                <p class="company-name">${job.company}</p>
                <div class="job-meta">
                    <span>📍 ${job.location}</span>
                    <span>💰 ${job.salary}</span>
                    <span>🕒 ${job.type}</span>
                </div>
                <div class="job-tags">
                    ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="job-actions">
                <button class="btn-primary">Apply Now</button>
                <button class="btn-outline">Save</button>
            </div>
        </div>
    `).join('');
}

function viewModule(moduleId) {
    const module = modules[moduleId];
    if (!module) return;

    showSection('module-detail');
    const content = document.getElementById('module-content');

    // Set back button behavior
    document.getElementById('backToModule').onclick = () => showSection('module-detail');

    content.innerHTML = `
        <div class="module-header">
            <h1 class="text-gradient">${module.title}</h1>
            <p>${module.description}</p>
        </div>
        <div class="lesson-list">
            ${module.lessons.map(lesson => `
                <div class="lesson-item">
                    <div class="lesson-info">
                        <h3>${lesson.title}</h3>
                        <p>${lesson.duration} • Fundamentals</p>
                    </div>
                    <button class="btn-primary" onclick="startLesson('${moduleId}', ${lesson.id})">Start Lesson</button>
                </div>
            `).join('')}
        </div>
    `;
}

const lessonContent = {
    'dsa-1': {
        title: 'Arrays & Hashing',
        content: `
            <h3>Understanding Arrays</h3>
            <p>An array is a collection of elements identified by index or key. In most languages, arrays are stored in contiguous memory locations.</p>
            <div class="code-block">
// Initialize an array
let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple
            </div>
            <h3>Common Operations</h3>
            <p>Accessing an element by index takes O(1) time. Searching for an element takes O(n) time if the array is unsorted.</p>
            <div class="interview-tip">
                <strong>Interview Tip:</strong>
                Always consider the space-time tradeoff when using Hash Maps to solve Array problems (like Two Sum).
            </div>
        `
    },
    'os-1': {
        title: 'Processes & Threads',
        content: `
            <h3>What is a Process?</h3>
            <p>A process is an instance of a program in execution. It contains the program code and its current activity.</p>
            <div class="code-block">
// Process State Diagram
New -> Ready -> Running -> Waiting -> Terminated
            </div>
            <h3>Threads vs Processes</h3>
            <p>Threads are the smallest unit of execution within a process. Multiple threads within the same process share memory space.</p>
            <div class="interview-tip">
                <strong>Interview Tip:</strong>
                Be prepared to explain the "Context Switch" and why it's expensive.
            </div>
        `
    }
};

function startLesson(moduleId, lessonId) {
    const key = `${moduleId}-${lessonId}`;
    const lesson = lessonContent[key] || {
        title: 'Coming Soon',
        content: '<p>This lesson content is being prepared. Stay tuned!</p>'
    };

    showSection('lesson-view');
    const content = document.getElementById('lesson-content');
    content.innerHTML = `
        <h2>${lesson.title}</h2>
        ${lesson.content}
    `;
}

// Initial job search listener
document.getElementById('jobSearch')?.addEventListener('input', (e) => {
    renderJobs(e.target.value);
});

// Initialize home section
window.onload = () => {
    showSection('home');
};


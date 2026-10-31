/* ================================1. LIVE STATUS BADGE LOGIC================================*/

function updateStatus() {
    const badge = document.getElementById('store-status');
    const text = badge.querySelector('.status-text');
    
    const now = new Date();
    const day = now.getDay();    // 0=Sun, 1=Mon...
    const hour = now.getHours();

    // --------------------- ALL OPEN & CLOSE UPDATES AREA --------------------- //
    
    // 1. Weekly Day Off
    const isSundayOff = (day === 0); 
    
    // 2. PUBLIC HOLIDAYS (Khmer New Year, etc.)
    const nationalHolidays = [
        '2026-04-14', 
        '2026-04-15', 
        '2026-04-16',
        '2026-05-01'
    ];

    // 3. PERSONAL IMPORTANT DAYS OFF (Update these for your 2-3 day breaks)
    const personalDaysOff = [
        //'2026-03-14', // Today
        //'2026-03-15', // Tomorrow 
        '2026-03-16'  // Another Day
    ];
    
    //---------------------------------- END ----------------------------------//

    const todayDate = now.toLocaleDateString('en-CA'); 
    const isNationalHoliday = nationalHolidays.includes(todayDate);
    const isPersonalDay = personalDaysOff.includes(todayDate);

    // DECISION LOGIC (Priority Order)
    if (isSundayOff) {
        badge.className = 'status-badge closed';
        text.innerText = 'សម្រាកថ្ងៃអាទិត្យ';
    } 
    else if (isNationalHoliday) {
        badge.className = 'status-badge closed';
        text.innerText = 'សម្រាកបុណ្យជាតិ';
    } 
    else if (isPersonalDay) {
        badge.className = 'status-badge closed';
        text.innerText = 'សម្រាកបណ្តោះអាសន្ន'; // Says "Special Break" for your personal dates
    }
    else if (hour >= 7 && hour < 20) {
        badge.className = 'status-badge open';
        text.innerText = 'កំពុងបើកលក់';
    } 
    else {
        badge.className = 'status-badge closed';
        text.innerText = 'បិទបណ្តោះអាសន្ន';
    }
}

// Check every 30 seconds
updateStatus();
setInterval(updateStatus, 30000);
/* ================================END OF LIVE STATUS BADGE LOGIC================================*/


/* ===============================2. MOBILE NAVIGATION LOGIC=================================*/

const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Toggle Hamburger Menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling and Auto-Close Menu
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close mobile menu after clicking a link
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});
/* ===============================END OFF MOBILE NAVIGATION LOGIC=================================*/


/* =================================3. SCROLL REVEAL ANIMATION===============================*/

function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 150; // Pixels from bottom to trigger

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Listen for scroll events
window.addEventListener("scroll", reveal);

// Run once on load to show elements already in view
reveal();
/* =================================END OFF SCROLL REVEAL ANIMATION===============================*/
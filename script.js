
const carPrices = {
    'luxury-sedan': 120,
    'suv': 150,
    'sports-car': 200,
    'electric-car': 130,
    'luxury-suv': 180,
    'compact-car': 80
};


const carNames = {
    'luxury-sedan': 'Luxury Sedan',
    'suv': 'SUV',
    'sports-car': 'Sports Car',
    'electric-car': 'Electric Car',
    'luxury-suv': 'Luxury SUV',
    'compact-car': 'Compact Car'
};


const rentalModal = new bootstrap.Modal(document.getElementById('rentalModal'));
let selectedCar = null;


document.querySelectorAll('.rent-btn').forEach(button => {
    button.addEventListener('click', function() {
        selectedCar = this.dataset.car;
        document.getElementById('selectedCar').value = carNames[selectedCar];
        document.getElementById('pickupDate').value = '';
        document.getElementById('returnDate').value = '';
        document.getElementById('totalCost').value = '';
        rentalModal.show();
    });
});


document.getElementById('pickupDate').addEventListener('change', calculateTotal);
document.getElementById('returnDate').addEventListener('change', calculateTotal);

function calculateTotal() {
    const pickupDate = new Date(document.getElementById('pickupDate').value);
    const returnDate = new Date(document.getElementById('returnDate').value);
    
    if (pickupDate && returnDate && selectedCar) {
        const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
        if (days > 0) {
            const total = days * carPrices[selectedCar];
            document.getElementById('totalCost').value = `$${total}`;
        }
    }
}


document.getElementById('confirmRental').addEventListener('click', function() {
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;
    
    if (!pickupDate || !returnDate) {
        alert('Please select both pick-up and return dates');
        return;
    }
    
    const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
    const total = days * carPrices[selectedCar];
    

    alert(`Thank you for your rental! You have rented a ${carNames[selectedCar]} for ${days} days. Total cost: $${total}`);
    rentalModal.hide();
});


document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});


const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
    
        alert(`Thank you for your message, ${name}! We will get back to you soon.`);
        
        
        this.reset();
    });
}


window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});


const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});


const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
    
    
    document.addEventListener('click', function(e) {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
} 
// ========================================
// CONFIGURATION - UPDATE THESE VALUES
// ========================================

// Set your anniversary date here (YYYY-MM-DD format)
const ANNIVERSARY_DATE = '2023-08-01'; // Change this to your actual anniversary date
const CORRECT_PASSWORD = ANNIVERSARY_DATE; // Password is the anniversary date

// ========================================
// PASSWORD SYSTEM
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const introPage = document.getElementById('intro-page');
    const mainPage = document.getElementById('main-page');
    const passwordInput = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    const successMessage = document.getElementById('success-message');
    const continueBtn = document.getElementById('continue-btn');
    const introFormContainer = document.querySelector('.intro-form-container');

    // Handle password entry (automatic on input change)
    function checkPassword() {
        const enteredDate = passwordInput.value;
        
        if (enteredDate === CORRECT_PASSWORD) {
            // Correct password - show success message
            introFormContainer.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            setTimeout(() => {
                errorMsg.classList.add('hidden');
            }, 100);
        } else if (enteredDate && enteredDate !== CORRECT_PASSWORD) {
            // Wrong password - show error
            errorMsg.classList.remove('hidden');
            passwordInput.style.borderColor = '#ff6b6b';
            
            setTimeout(() => {
                errorMsg.classList.add('hidden');
                passwordInput.style.borderColor = '';
            }, 3000);
        }
    }

    // Handle continue button click
    function proceedToMainPage() {
        introPage.classList.remove('active');
        introPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
        setTimeout(() => {
            mainPage.classList.add('active');
        }, 100);
        
        // Start the countdown timer
        startCountdown();
    }

    // Event listeners for password entry
    passwordInput.addEventListener('change', checkPassword);
    passwordInput.addEventListener('input', function() {
        // Reset error state on input
        errorMsg.classList.add('hidden');
        passwordInput.style.borderColor = '';
    });
    
    continueBtn.addEventListener('click', proceedToMainPage);

    // ========================================
    // COUNTDOWN TIMER
    // ========================================

    function startCountdown() {
        const startDate = new Date(ANNIVERSARY_DATE);
        
        function updateCountdown() {
            const now = new Date();
            const timeDiff = now - startDate;
            
            // Calculate time units
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            // Update the display
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        }
        
        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ========================================
    // NAVIGATION FUNCTIONALITY - Updated for scrolling
    // ========================================

    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Hamburger menu toggle functionality
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Handle navigation clicks for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(`${targetSection}-section`);
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to target section
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Update active navigation item based on scroll position
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 150; // Offset for navbar height
        
        contentSections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id.replace('-section', '');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events to update active navigation
    window.addEventListener('scroll', updateActiveNavigation);

    // ========================================
    // GIFT BOX ANIMATION (Updated)
    // ========================================

    const giftBox = document.getElementById('gift-box');
    const giftMessage = document.getElementById('gift-message');
    const giftInstruction = document.querySelector('.gift-instruction');

    if (giftBox) {
        giftBox.addEventListener('click', function() {
            // Add opened class for animation
            giftBox.classList.add('opened');
            
            // Hide the instruction text and show the message
            if (giftInstruction) {
                giftInstruction.style.display = 'none';
            }
            
            setTimeout(() => {
                giftMessage.classList.remove('hidden');
            }, 500);
        });

        // Add sparkle effect on gift hover
        giftBox.addEventListener('mouseenter', function() {
            if (!giftBox.classList.contains('opened')) {
                giftBox.style.filter = 'drop-shadow(0 0 20px gold)';
            }
        });

        giftBox.addEventListener('mouseleave', function() {
            giftBox.style.filter = '';
        });
    }

    // ========================================
    // OPEN WHEN LETTERS
    // ========================================

    const letterCards = document.querySelectorAll('.letter-card');
    
    letterCards.forEach(card => {
        card.addEventListener('click', function() {
            const letterContent = card.querySelector('.letter-content');
            
            if (card.classList.contains('opened')) {
                // Close the letter
                letterContent.classList.add('hidden');
                card.classList.remove('opened');
            } else {
                // Open the letter
                letterContent.classList.remove('hidden');
                card.classList.add('opened');
            }
        });
    });

    // ========================================
    // INTERACTIVE QUIZ
    // ========================================

    let currentQuestion = 1;
    let score = 0;
    const totalQuestions = 7; // Updated to match your 7 questions

    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizResult = document.getElementById('quiz-result');
    const quizScore = document.getElementById('quiz-score');
    const restartBtn = document.getElementById('restart-quiz');

    // Handle quiz option clicks
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const currentQuestionEl = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
            const options = currentQuestionEl.querySelectorAll('.quiz-option');
            
            // Disable all options in current question
            options.forEach(opt => opt.style.pointerEvents = 'none');
            
            // Check if answer is correct
            const isCorrect = option.dataset.correct === 'true';
            
            if (isCorrect) {
                option.classList.add('correct');
                score++;
            } else {
                option.classList.add('incorrect');
                // Show the correct answer
                options.forEach(opt => {
                    if (opt.dataset.correct === 'true') {
                        opt.classList.add('correct');
                    }
                });
            }
            
            // Move to next question after delay
            setTimeout(() => {
                currentQuestionEl.classList.add('hidden');
                currentQuestion++;
                
                if (currentQuestion <= totalQuestions) {
                    const nextQuestion = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
                    nextQuestion.classList.remove('hidden');
                } else {
                    // Show results
                    showQuizResults();
                }
            }, 2000);
        });
    });

    function showQuizResults() {
        quizScore.textContent = `You got ${score} out of ${totalQuestions} questions correct!`;
        quizResult.classList.remove('hidden');
    }

    // Restart quiz functionality
    restartBtn.addEventListener('click', function() {
        currentQuestion = 1;
        score = 0;
        
        // Reset all questions
        quizQuestions.forEach((question, index) => {
            question.classList.add('hidden');
            if (index === 0) question.classList.remove('hidden');
            
            // Reset all options
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.remove('correct', 'incorrect');
                option.style.pointerEvents = '';
            });
        });
        
        quizResult.classList.add('hidden');
    });

    // ========================================
    // SMOOTH SCROLLING FOR BETTER UX
    // ========================================

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // ========================================
    // ADDITIONAL INTERACTIVE FEATURES
    // ========================================

    // Add sparkle effect on gift hover
    giftBox.addEventListener('mouseenter', function() {
        if (!giftBox.classList.contains('opened')) {
            giftBox.style.filter = 'drop-shadow(0 0 20px gold)';
        }
    });

    giftBox.addEventListener('mouseleave', function() {
        giftBox.style.filter = '';
    });

    // Add click effects to photo cards
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = card.querySelector('img');
            const caption = card.querySelector('p');
            
            if (img && caption) {
                openImageModal(img.src, caption.textContent, img.alt);
            }
        });
    });

    // ========================================
    // IMAGE MODAL FUNCTIONALITY
    // ========================================

    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');

    function openImageModal(imageSrc, captionText, altText) {
        modalImage.src = imageSrc;
        modalImage.alt = altText;
        modalCaption.textContent = captionText;
        
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Clear the modal after animation
        setTimeout(() => {
            modalImage.src = '';
            modalCaption.textContent = '';
        }, 300);
    }

    // Close modal when clicking the X button
    if (closeModal) {
        closeModal.addEventListener('click', function(e) {
            e.stopPropagation();
            closeImageModal();
        });
    }

    // Close modal when clicking outside the image
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });
});

// ========================================
// CUSTOMIZATION NOTES
// ========================================

/*
TO CUSTOMIZE THIS WEBSITE:

1. Update ANNIVERSARY_DATE at the top of this file
2. Replace placeholder images in HTML with your actual photos
3. Customize quiz questions and answers in HTML
4. Modify the "Open When" letter messages in HTML
5. Update the gift message in HTML
6. Adjust colors in CSS using the color palette variables
7. Add more quiz questions by:
   - Adding new .quiz-question divs in HTML
   - Updating totalQuestions variable above
8. Add more photos by creating new .photo-card divs
9. Add more "Open When" letters by creating new .letter-card divs

PHOTO REPLACEMENT:
- Replace the placeholder image URLs (https://via.placeholder.com/...) 
- Use your actual photo files or upload to a hosting service
- Recommended image size: 300x200 pixels for best results

QUIZ CUSTOMIZATION:
- Edit questions in the HTML file
- Make sure to set data-correct="true" on the right answer
- Add more questions by copying the quiz-question div structure
*/

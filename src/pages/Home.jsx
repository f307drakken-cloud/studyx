import React, { useState, useEffect } from 'react';

// Typewriter effect component
function Typewriter({ text, delay = 50 }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}<span className="caret">|</span></span>;
}

function Home() {
  const [formState, setFormState] = useState({ state: 'idle', message: 'Submit' });
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.content-reveal');
    const revealCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));
    
    return () => revealObserver.disconnect();
  }, []);

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setFormState({ state: 'submitting', message: 'Submitting...' });
    setTimeout(() => {
      setFormState({ state: 'success', message: 'Success! Welcome to AbdullahHayatStudyHub' });
      e.target.reset();
      setTimeout(() => {
        setFormState({ state: 'idle', message: 'Submit' });
      }, 3000);
    }, 1500);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const subjects = [
    "Maths", "Urdu", "English", "General Science", "Physics", "Chemistry", 
    "Biology", "Computer Science / IT", "Pakistan Studies", "Islamic Studies", 
    "History", "Geography", "Civics", "Art & Drawing", "General Knowledge", 
    "Moral Education / Ethics", "Economics (Micro, Macro)", "Accounting", 
    "Business Studies / Management", "Finance & Banking", 
    "Marketing & Entrepreneurship", "English Literature", "Urdu Literature", 
    "Political Science", "Sociology / Psychology", "Computer Applications", 
    "Web Design / Development", "Digital Literacy / Office Skills"
  ];

  const faqs = [
    { q: "What is AbdullahHayatStudyHub?", a: "AbdullahHayatStudyHub is a premium online learning platform that provides students from Grade 1 to College (Grades 11–16) with structured practice tests, worksheets, and exam preparation materials." },
    { q: "Are the materials suitable for all subjects and grades?", a: "Yes! We offer carefully designed materials for Math, English, Urdu, Science, Social Studies, General Knowledge, and extra skills, tailored to each grade." },
    { q: "Are the tests graded?", a: "Some tests provide instant feedback or scoring to help students identify strengths and areas for improvement. Full exam sessions may also be monitored by an online tutor." },
    { q: "Is my information secure?", a: "Yes! All student and user data is securely managed, and worksheet access is password-protected to ensure privacy and safety." }
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero section-padding">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container text-center content-reveal mx-auto" style={{maxWidth: '900px'}}>
          <h1 className="hero-title">
            <Typewriter text="Welcome to AbdullahHayatStudyHub - The Home of Limitless Genius!" delay={40} />
          </h1>
          <div className="writing-style-container">
            <p className="hero-subtitle centered-text writing-style">
              Welcome to AbdullahHayatStudyHub, where curiosity becomes brilliance, effort turns into mastery, and every student rises to greatness.
              This is not just a learning platform—it’s a revolution, a journey, and a launchpad for unstoppable success.
            </p>
            <p className="hero-text centered-text writing-style">
              Here, your potential has no limits, your dreams have no boundaries, and your achievements know no rivals.
            </p>
            <p className="hero-highlight writing-style" style={{fontSize: '2rem', padding: '1rem 0'}}>
              Step in, embrace excellence, and become extraordinary!
            </p>
          </div>
          <div className="hero-buttons">
            <a href="#register" className="btn btn-primary btn-lg">Start Your Journey</a>
            <a href="#about" className="btn btn-secondary btn-lg">Learn More</a>
          </div>
        </div>
      </section>

      {/* Registration Form - Tightened to central column */}
      <section id="register" className="register-section section-padding">
        <div className="container">
          <div className="form-wrapper content-reveal mx-auto" style={{maxWidth: '850px'}}>
            <div className="form-header">
              <h2>Join the Revolution</h2>
              <p>Enter your details below to unlock your personalized learning journey.</p>
            </div>
            
            <form id="registrationForm" className="glass-form" onSubmit={handleRegistrationSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First name*</label>
                  <input type="text" id="firstName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name*</label>
                  <input type="text" id="lastName" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="grade">Grade / Class*</label>
                  <select id="grade" required defaultValue="">
                    <option value="" disabled>Select your grade</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>Grade {num}</option>
                    ))}
                    <option value="college">Colleges Grade(Grade 11-16)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Subjects Interested In*</label>
                <div className="checkbox-grid">
                  {subjects.map((sub, idx) => (
                    <label key={idx} className="checkbox-label">
                      <input type="checkbox" name="subject" value={sub} /> 
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="learningMode">Preferred Learning Mode*</label>
                <select id="learningMode" required defaultValue="">
                  <option value="" disabled>Select mode</option>
                  <option value="Self-Practice">Self-Practice</option>
                  <option value="Guided Online Tutor">Guided Online Tutor</option>
                  <option value="Test & Exam Preparation">Test & Exam Preparation</option>
                  <option value="Mixed / Hybrid">Mixed / Hybrid</option>
                  <option value="Skill-Building Courses">Skill-Building Courses</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for Joining*</label>
                <textarea id="reason" rows="3" required></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Questions or Notes*</label>
                <textarea id="notes" rows="3" required></textarea>
              </div>

              <div className="form-group policy-check">
                <label className="checkbox-label" style={{alignItems: 'center'}}>
                  <input type="checkbox" id="policy" required style={{margin: '0 10px 0 0'}} />
                  <span>"I agree to AbdullahHayatStudyHub’s Privacy Policy and consent to the collection and use of my personal data for account creation, course access, and communication regarding my learning progress." *</span>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                style={{
                  opacity: formState.state === 'submitting' ? 0.7 : 1,
                  background: formState.state === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : ''
                }}
              >
                {formState.message}
              </button>
              
              <p className="form-footer-note">
                “By completing this form, you unlock access to high-quality practice tests and exam materials. Your details enable us to support your learning journey with greater precision and care.”
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* About Article Section */}
      <section id="about" className="article-section section-padding">
        <div className="container content-reveal mx-auto" style={{maxWidth: '900px'}}>
          <h2 className="article-title text-center">AbdullahHayatStudyHub: Revolutionizing Learning and Exam Preparation for Every Student</h2>
          <div className="article-content" style={{textAlign: 'justify'}}>
            <p className="writing-style" style={{fontSize: '1.4rem'}}>
              In today’s fast-paced educational world, students need more than just textbooks—they need a platform that transforms learning into a structured, engaging, and results-driven journey. AbdullahHayatStudyHub is not just a website; it is a global standard for online learning, designed to help students from Grade 1 to College (Grades 11–16) achieve academic excellence through practice, guidance, and progress tracking.
            </p>
            <p className="writing-style" style={{fontSize: '1.4rem'}}>
              At AbdullahHayatStudyHub, we believe that every student has the potential to achieve greatness. Our platform provides meticulously designed practice tests, worksheets, and exam preparation materials, ensuring that learning is effective, consistent, and inspiring. Each resource is carefully structured to reinforce concepts, improve problem-solving skills, and build confidence, preparing students for both school exams and higher education challenges.
            </p>
            
            <h3 className="mt-4 mb-3">Why AbdullahHayatStudyHub Stands Out</h3>
            <p>
              Unlike other platforms, AbdullahHayatStudyHub combines quality, accessibility, and personalized learning. Students don’t just access PDFs—they experience an interactive learning journey where their progress is tracked, their strengths are celebrated, and areas for improvement are highlighted. With password-protected practice materials, a secure and structured learning environment, and a dedicated focus on academic growth, students can learn at their own pace while staying motivated.
            </p>
            
            <h4 className="mt-4 mb-3">Features That Empower Students:</h4>
            <ul className="feature-list no-emojis">
              <li><strong>Grade-wise Learning:</strong> From fundamentals to advanced topics, every grade receives tailored materials.</li>
              <li><strong>Comprehensive Subject Coverage:</strong> Math, Science, English, Urdu, Social Studies, General Knowledge, and more.</li>
              <li><strong>Secure Access to Resources:</strong> Every worksheet and test is password-protected for quality and focus.</li>
              <li><strong>Progress Tracking:</strong> Students can monitor their growth with visual progress bars and dashboards.</li>
              <li><strong>Flexible Exam Preparation:</strong> Students can book personalized exam sessions, practice mock tests, and review results for continuous improvement.</li>
            </ul>
            
            <p className="mt-4">
              AbdullahHayatStudyHub is more than just a study tool—it is a launchpad for success. Students gain confidence, knowledge, and mastery, while parents have peace of mind knowing their children are guided and supported in a safe and structured learning environment.
            </p>
          </div>
          
          <div className="author-bio mt-5">
            <div className="author-image-placeholder">
              <div className="image-skeleton"></div>
            </div>
            <div className="author-text">
              <p className="writing-style" style={{fontSize: '1.4rem', color: '#cbd5e1'}}>
                “This article is written by Abdullah Hayat, the visionary founder of AbdullahHayatStudyHub — who created this platform at the young age of 14, becoming Pakistan’s first dedicated education innovator at such a young age. Today, AbdullahHayatStudyHub stands as a world-class platform for structured learning, practice, and exam preparation.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section tight layout */}
      <section id="faq" className="faq-section section-padding">
        <div className="container content-reveal mx-auto" style={{maxWidth: '800px'}}>
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`accordion-item ${activeFaq === idx ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleFaq(idx)}>
                  {faq.q} <span className="icon">+</span>
                </button>
                <div 
                  className="accordion-content"
                  style={{ maxHeight: activeFaq === idx ? '500px' : '0' }}
                >
                  <p><strong>A:</strong> {faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

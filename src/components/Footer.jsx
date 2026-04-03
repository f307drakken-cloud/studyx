import React, { useState } from 'react';

function Footer() {
  const [newsState, setNewsState] = useState({ state: 'idle', message: 'Subscribe' });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsState({ state: 'submitting', message: 'Subscribing...' });
    
    const formData = new FormData(e.target);
    formData.append('_subject', 'New Newsletter Subscription!');

    fetch('https://formsubmit.co/ajax/f307.drakken@gmail.com', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      setNewsState({ state: 'success', message: 'Subscribed!' });
      e.target.reset();
      setTimeout(() => {
        setNewsState({ state: 'idle', message: 'Subscribe' });
      }, 3000);
    })
    .catch(error => {
      setNewsState({ state: 'idle', message: 'Error' });
    });
  };

  return (
    <footer className="footer">
      <div className="footer-art">
        <div className="stairs">
          <div className="step"></div><div className="step"></div><div className="step"></div>
          <div className="sphere"></div>
        </div>
      </div>
      
      <div className="container content-reveal active">
        <div className="newsletter-box">
          <h3>Join our mailing list</h3>
          <p>I want to subscribe to your mailing list.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" name="Email" placeholder="Email*" required />
            <button type="submit" className="btn btn-primary">{newsState.message}</button>
          </form>
        </div>
        
        <div className="footer-grid">
          <div className="footer-info">
            <h4>© Copyright Notice</h4>
            <p>© 2026 AbdullahHayatStudyHub. All rights reserved.</p>
            <p>No part of this website, including its content, materials, or resources, may be reproduced, distributed, or transmitted in any form without prior written permission from Abdullah Hayat.</p>
          </div>
          <div className="footer-publisher">
            <h4>📝 Publication Note</h4>
            <p>Published by: Abdullah Hayat</p>
            <p>Last Updated: 12 January 2026</p>
            <p>This website is regularly updated with new learning resources, quizzes, and study materials to provide students with the best possible learning experience.</p>
          </div>
        </div>
        
        <div className="footer-credits text-center mt-4">
          <p>Published by ; Abdullah Website Maker</p>
          <p>For contact: f307.drakken@gmail.com</p>
          <p className="mt-2 text-muted" style={{ fontStyle: 'italic' }}>Made by Ammara Lohani 🖤</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

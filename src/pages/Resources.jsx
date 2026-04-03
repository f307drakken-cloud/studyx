import React, { useState, useEffect } from 'react';

// Vite glob import — eagerly collects ALL PDFs from src/content (all subfolders)
const pdfModules = import.meta.glob('/src/content/**/*.pdf', { eager: true, as: 'url' });

function Resources() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const grades = Array.from({ length: 10 }, (_, i) => i + 1);
  const tests = Array.from({ length: 10 }, (_, i) => i + 1);

  // 🔥 Countdown target date (CHANGE THIS ANYTIME)
  const competitionDate = new Date("2026-05-01T12:00:00").getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = competitionDate - now;

      if (distance <= 0) {
        setTimeLeft({ expired: true });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getFileUrl = (grade, type, testNum = null) => {
    const gradeKey = grade === 'Colleges' ? 'Colleges Grade' : `Grade ${grade}`;
    const gradeRegex = new RegExp(`${gradeKey}(?!\\d)`, 'i');

    for (const [path, rawUrl] of Object.entries(pdfModules)) {
      let url = rawUrl;
      if (typeof rawUrl === 'object' && rawUrl !== null) {
        url = rawUrl.default || Object.values(rawUrl)[0] || '';
      }
      if (typeof url !== 'string') {
        url = String(url);
      }

      const normalised = path.replace(/\\/g, '/');
      if (!gradeRegex.test(normalised)) continue;

      const lower = normalised.toLowerCase();

      if (type === 'syllabus' && lower.includes('syllabus')) return url;

      if (type === 'test' && testNum !== null) {
        const re = new RegExp(`test\\s*${testNum}[\\s\\._\\-]`, 'i');
        if (re.test(lower)) return url;
      }

      if (type === 'combined' && lower.includes('combine')) return url;
    }
    return null;
  };

  return (
    <div className="resources-page pt-32 pb-16 min-h-screen">
      <div className="container mx-auto" style={{ maxWidth: '960px' }}>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="hero-title resources-hero-title">
            Study <span className="gradient-text">Resources</span>
          </h1>
          <p className="hero-subtitle">
            Select your grade below to view and download tests & syllabus materials.
          </p>
        </div>

        {/* Grade selector */}
        <div className="grade-selector mb-10">
          <h2 className="text-center mb-4">Select Your Grade</h2>
          <div className="grade-btn-grid">
            {grades.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`btn grade-btn ${selectedGrade === g ? 'btn-primary' : 'btn-secondary'}`}
              >
                Grade {g}
              </button>
            ))}
            <button
              onClick={() => setSelectedGrade('Colleges')}
              className={`btn grade-btn grade-btn--wide ${selectedGrade === 'Colleges' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Colleges Grade
            </button>
          </div>
        </div>

        {/* Resources */}
        {selectedGrade && (
          <div className="glass-box mt-5 p-5">
            <h3 className="gradient-text mb-4 text-center">
              {selectedGrade === 'Colleges' ? 'Colleges Grade' : `Grade ${selectedGrade}`} Resources
            </h3>

            <div className="resource-grid">
              {selectedGrade === 'Colleges' ? (
                <>
                  {/* Combined */}
                  {(() => {
                    const url = getFileUrl('Colleges', 'combined');
                    return (
                      <div className="file-card" style={{ opacity: url ? 1 : 0.5 }}>
                        📄 Combined Tests
                        {url ? (
                          <>
                            <a href={url} target="_blank">Open</a>
                            <a href={url} download>Download</a>
                          </>
                        ) : <button disabled>Not Available</button>}
                      </div>
                    );
                  })()}

                  {/* Syllabus */}
                  {(() => {
                    const url = getFileUrl('Colleges', 'syllabus');
                    return (
                      <div className="file-card" style={{ opacity: url ? 1 : 0.5 }}>
                        📑 Syllabus
                        {url ? (
                          <>
                            <a href={url} target="_blank">Open</a>
                            <a href={url} download>Download</a>
                          </>
                        ) : <button disabled>Not Available</button>}
                      </div>
                    );
                  })()}
                </>
              ) : (
                <>
                  {tests.map(t => {
                    const url = getFileUrl(selectedGrade, 'test', t);
                    return (
                      <div key={t} className="file-card" style={{ opacity: url ? 1 : 0.5 }}>
                        📄 Test {t}
                        {url ? (
                          <>
                            <a href={url} target="_blank">Open</a>
                            <a href={url} download>Download</a>
                          </>
                        ) : <button disabled>Not Available</button>}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}

        {/* 🔥 COUNTDOWN SECTION */}
        <div className="glass-box mt-10 p-6 text-center relative overflow-hidden">

          <h2 className="gradient-text mb-4 text-2xl">
            ✨ Upcoming Writing Competition ✨
          </h2>

          {!timeLeft.expired ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '20px' }}>
              <div>{timeLeft.days}d</div>
              <div>{timeLeft.hours}h</div>
              <div>{timeLeft.minutes}m</div>
              <div>{timeLeft.seconds}s</div>
            </div>
          ) : (
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              Competition Started 🚀
            </p>
          )}

          <p style={{ marginTop: '10px' }}>
            Countdown to the next writing competition!
          </p>

          {/* 👏 Animation */}
          <div className="clap">👏👏👏👏👏</div>

        </div>

      </div>

      {/* 🎨 Animation CSS */}
      <style>
        {`
          .clap {
            position: absolute;
            right: 10px;
            top: 50%;
            font-size: 24px;
            animation: move 2s infinite;
          }

          @keyframes move {
            0% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-60%) scale(1.2); }
            100% { transform: translateY(-50%) scale(1); }
          }
        `}
      </style>

    </div>
  );
}

export default Resources;

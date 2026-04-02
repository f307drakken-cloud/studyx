import React, { useState } from 'react';

// Vite glob import — eagerly collects ALL PDFs from src/content (all subfolders)
const pdfModules = import.meta.glob('/src/content/**/*.pdf', { as: 'url', eager: true });

// Debug: log what Vite collected (remove after confirming it works)
// console.log('PDF modules found:', Object.keys(pdfModules));

function Resources() {
  const [selectedGrade, setSelectedGrade] = useState(null);

  const grades = Array.from({ length: 10 }, (_, i) => i + 1);
  const tests = Array.from({ length: 10 }, (_, i) => i + 1);

  /**
   * Find a PDF URL by grade, type (syllabus | test), and optional test number.
   * Matches against the full module path, case-insensitively.
   */
  const getFileUrl = (grade, type, testNum = null) => {
    // Construct a safe regex for the grade. Add \b or [^\d] so "Grade 1" doesn't match "Grade 10"
    const gradeKey = grade === 'Colleges' ? 'Colleges Grade' : `Grade ${grade}`;
    const gradeRegex = new RegExp(`${gradeKey}(?!\\d)`, 'i');

    for (const [path, url] of Object.entries(pdfModules)) {
      // Normalise path for comparison
      const normalised = path.replace(/\\/g, '/');
      if (!gradeRegex.test(normalised)) continue;

      const lower = normalised.toLowerCase();

      if (type === 'syllabus' && lower.includes('syllabus')) {
        return url;
      }

      if (type === 'test' && testNum !== null) {
        // Match "test 1 ", "test 1.", "test1_" etc. but NOT test 10 when looking for 1
        const re = new RegExp(`test\\s*${testNum}[\\s\\._\\-]`, 'i');
        if (re.test(lower)) return url;
      }

      if (type === 'combined' && lower.includes('combine')) {
        return url;
      }
    }
    return null;
  };

  return (
    <div className="resources-page pt-32 pb-16 min-h-screen">
      <div className="container mx-auto" style={{ maxWidth: '960px' }}>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="hero-title resources-hero-title">
            Study&nbsp;<span className="gradient-text">Resources</span>
          </h1>
          <p className="hero-subtitle">
            Select your grade below to view and download tests &amp; syllabus materials.
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

        {/* Resource grid for selected grade */}
        {selectedGrade && (
          <div className="grade-content content-reveal active glass-box mt-5 p-5">
            <h3 className="gradient-text mb-4 text-center">
              {selectedGrade === 'Colleges' ? 'Colleges Grade' : `Grade ${selectedGrade}`} Resources
            </h3>

            <div className="resource-grid">
              {selectedGrade === 'Colleges' ? (
                <>
                  {/* Two specific cards for Colleges Grade */}
                  {(() => {
                    const combinedUrl = getFileUrl('Colleges', 'combined');
                    return (
                      <div className="file-card" style={{ opacity: combinedUrl ? 1 : 0.5 }}>
                        <span className="file-card-icon">📄</span>
                        <strong>Combined Tests 1-10</strong>
                        {combinedUrl ? (
                          <div className="file-actions">
                            <a href={combinedUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">Open</a>
                            <a href={combinedUrl} download className="btn btn-sm btn-primary">Download</a>
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-unavailable" disabled>Not Available</button>
                        )}
                      </div>
                    );
                  })()}
                  {(() => {
                    const syllabusUrl = getFileUrl('Colleges', 'syllabus');
                    return (
                      <div className="file-card syllabus-card" style={{ opacity: syllabusUrl ? 1 : 0.5 }}>
                        <span className="file-card-icon">📑</span>
                        <strong>Colleges Syllabus</strong>
                        {syllabusUrl ? (
                          <div className="file-actions">
                            <a href={syllabusUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">Open</a>
                            <a href={syllabusUrl} download className="btn btn-sm btn-primary">Download</a>
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-unavailable" disabled>Not Available</button>
                        )}
                      </div>
                    );
                  })()}
                </>
              ) : (
                <>
                  {tests.map(t => {
                    const testUrl = getFileUrl(selectedGrade, 'test', t);
                    return (
                      <div key={t} className="file-card" style={{ opacity: testUrl ? 1 : 0.5 }}>
                        <span className="file-card-icon">📄</span>
                        <strong>Test {t}</strong>
                        {testUrl ? (
                          <div className="file-actions">
                            <a href={testUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">Open</a>
                            <a href={testUrl} download className="btn btn-sm btn-primary">Download</a>
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-unavailable" disabled>Not Available</button>
                        )}
                      </div>
                    );
                  })}

                  {/* Syllabus card */}
                  {(() => {
                    const syllabusUrl = getFileUrl(selectedGrade, 'syllabus');
                    return (
                      <div className="file-card syllabus-card" style={{ opacity: syllabusUrl ? 1 : 0.5 }}>
                        <span className="file-card-icon">📑</span>
                        <strong>Syllabus</strong>
                        {syllabusUrl ? (
                          <div className="file-actions">
                            <a href={syllabusUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">Open</a>
                            <a href={syllabusUrl} download className="btn btn-sm btn-primary">Download</a>
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-unavailable" disabled>Not Available</button>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>

            <p className="resources-note">
              * If a file shows "Not Available" it hasn't been uploaded yet. Downloads save the PDF directly to your device.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Resources;

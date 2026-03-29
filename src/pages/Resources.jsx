import React, { useState, useMemo } from 'react';

// Use Vite's glob import to automatically gather all pdf files from src/content
const pdfModules = import.meta.glob('/src/content/**/*.pdf', { as: 'url', eager: true });

function Resources() {
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Generate Grades 1 to 10
  const grades = Array.from({ length: 10 }, (_, i) => i + 1);
  const tests = Array.from({ length: 10 }, (_, i) => i + 1);

  // A helper to find the correct URL for a given grade and specific test/syllabus
  const getFileUrl = (grade, type, testNum = null) => {
    const gradeSearchStr = `Grade ${grade} `;
    
    for (const [path, url] of Object.entries(pdfModules)) {
      if (path.includes(gradeSearchStr)) {
        const lowerPath = path.toLowerCase();
        
        if (type === 'syllabus' && lowerPath.includes('syllabus')) {
          return url;
        }
        
        if (type === 'test' && testNum !== null) {
          // ensure we match "test 1 " or "test 1." but NOT "test 10" when looking for 1
          const testSearchRegex = new RegExp(`test\\s*${testNum}[\\s\\.]`, 'i');
          if (testSearchRegex.test(lowerPath)) {
            return url;
          }
        }
      }
    }
    return null; // Return null if file is missing
  };

  return (
    <div className="resources-page pt-32 pb-16 min-h-screen">
      <div className="container mx-auto" style={{maxWidth: '900px'}}>
        
        <div className="text-center mb-10">
          <h1 className="hero-title" style={{fontSize: '3rem'}}>AbdullahHayatStudyHub Resources</h1>
          <p className="hero-subtitle">
            Select your grade to view and download the available tests and syllabus material.
          </p>
        </div>

        {/* Grade Selection Buttons */}
        <div className="grade-selector mb-10">
          <h2 className="text-center mb-4">Select Your Grade</h2>
          <div className="flex-center-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            {grades.map(g => (
              <button 
                key={g} 
                onClick={() => setSelectedGrade(g)}
                className={`btn ${selectedGrade === g ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                style={{ width: '120px' }}
              >
                Grade {g}
              </button>
            ))}
            <button 
                onClick={() => setSelectedGrade('Colleges')}
                className={`btn ${selectedGrade === 'Colleges' ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                style={{ width: '150px' }}
            >
              Colleges Grade
            </button>
          </div>
        </div>

        {/* Display Test & Syllabus if a grade is selected */}
        {selectedGrade && (
          <div className="grade-content content-reveal active glass-box mt-5 p-5">
            <h3 className="gradient-text mb-4 text-center">
              {selectedGrade === 'Colleges' ? 'Colleges Grade' : `Grade ${selectedGrade}`} Resources
            </h3>
            
            <div className="test-grid" style={{
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {tests.map(t => {
                const testUrl = getFileUrl(selectedGrade, 'test', t);
                return (
                  <div key={t} className="file-card" style={{opacity: testUrl ? 1 : 0.5}}>
                    <span style={{fontSize: '2.2rem'}}>📄</span>
                    <strong>Test {t}</strong>
                    {testUrl ? (
                      <div className="file-actions">
                        <a href={testUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">Open</a>
                        <a href={testUrl} download className="btn btn-sm btn-primary">Download</a>
                      </div>
                    ) : (
                      <button className="btn btn-sm" disabled style={{background: 'gray', color: '#fff', width:'100%'}}>Not Available</button>
                    )}
                  </div>
                );
              })}
              
              {(() => {
                const syllabusUrl = getFileUrl(selectedGrade, 'syllabus');
                return (
                  <div className="file-card" style={{border: '1px solid var(--secondary)', opacity: syllabusUrl ? 1 : 0.5}}>
                    <span style={{fontSize: '2.2rem'}}>📑</span>
                    <strong>Syllabus</strong>
                    {syllabusUrl ? (
                      <div className="file-actions">
                        <a href={syllabusUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">Open</a>
                        <a href={syllabusUrl} download className="btn btn-sm btn-primary">Download</a>
                      </div>
                    ) : (
                      <button className="btn btn-sm" disabled style={{background: 'gray', color: '#fff', width:'100%'}}>Not Available</button>
                    )}
                  </div>
                );
              })()}
            </div>
            
            <p className="text-center" style={{fontSize: '0.9rem', color: '#94a3b8', marginTop: '1rem'}}>
              * If a file is missing, it has not yet been uploaded to the system. Clicking download will save the PDF directly to your device.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Resources;

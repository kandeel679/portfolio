async function loadProjectDetails() {
    try {
        // Get project ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        // Fetch project data
        const response = await fetch('../JSON/projects.json');
        const data = await response.json();
        
        // Find the project in either featured or recent arrays
        const project = [...data.featured, ...data.recent].find(p => p.id.toString() === projectId);
        
        if (project) {
            // Update page content
            document.getElementById('projectTitle').textContent = project.title;
            document.getElementById('projectImage').src = project.image;
            document.getElementById('projectOverview').textContent = project.description;
            
            // Update other sections if you have the data in your JSON
            if (project.features) {
                const featuresHtml = project.features.map(feature => `<li>${feature}</li>`).join('');
                document.getElementById('projectFeatures').innerHTML = featuresHtml;
            }
            
            if (project.stack) {
                const stackHtml = project.stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
                document.getElementById('projectStack').innerHTML = stackHtml;
            }
            
            if (project.implementation) {
                document.getElementById('projectImplementation').textContent = project.implementation;
            }
            
            if (project.date) {
                document.getElementById('projectDate').textContent = `Completed in ${project.date}`;
            }
            if (project.github) {
                document.getElementById('project-links').innerHTML = `<a href="${project.github}" target="_blank" class="project-link github-link">
                    <svg fill="#000000" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"/>
                    </svg>
                    View Source Code
                </a>`;
            }
        }
    } catch (error) {
        console.error('Error loading project details:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProjectDetails);
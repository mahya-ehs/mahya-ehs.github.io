import stardust from '../assets/overlay3-web.jpg'

const educationData = [
    {
        subject: 'Mathematics and Physics',
        degree: 'High School',
        years: '2016 - 2019',
        university: '',
        more: [
            'GPA: 19.52/20', 
            'Ranked among top 1% in the University Entrance Exam',
        ],
    },
    {
        subject: 'Computer Engineering',
        degree: 'Bachelor of Science',
        years: '2019 - 2024',
        university: 'Ferdowsi University of Mashhad',
        more: [
            'GPA: 3.58/4',
            'Ranked among top 15%',
            'Thesis: PyTorch Conversion and Enhancement: Integrating Center Loss into a Winner-Take-All Neural Network with Competitive Cross Entropy'
        ],
    },
    {
        subject: 'Computer Science and Engineering',
        degree: 'Master of Science',
        years: '2024 - 2026',
        university: 'University of Oulu',
        more: [
            'GPA: 4.58/5',
            'Among the 120 recipients of [TechFinland100](https://techfinland100.fi/) grant for master thesis',
            'Thesis: Steel Surface Defect Detection using Deep Learning under Small Dataset Constraints',
        ]
    },
]

// Text written as [label](url) becomes a link that opens in a new tab
function formatPoint(text) {
    return text.split(/\[([^\]]+)\]\(([^)]+)\)/g).map((part, i, parts) => {
        if (i % 3 === 1) return <a key={i} href={parts[i + 1]} target="_blank" rel="noreferrer">{part}</a>
        if (i % 3 === 2) return null
        return part
    })
}

function Education() {
    return (
        <section className="edu-section" id="education">
            <div className="edu-texture" style={{ backgroundImage: `url(${stardust})` }} aria-hidden="true" />
            <h2 className="edu-title" data-reveal>What I studied ?</h2>
            <div className="edu-content-wrap">
                <div className="edu-content">
                    {educationData.map((item, index) => (
                        <div key={item.subject} className="edu" data-reveal style={{ '--reveal-delay': `${index * 120}ms` }}>
                            <p className="edu-subject">{item.subject}</p>
                            <p className="edu-degree">{item.degree}</p>
                            <p className="edu-years">{item.years}</p>
                            {item.university && <p className="edu-university">{item.university}</p>}
                            <ul className="edu-more">
                                {item.more.map((point) => (
                                    <li key={point}>{formatPoint(point)}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Education;

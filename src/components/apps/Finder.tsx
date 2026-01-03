import { useState } from 'react';
import { FileText, Briefcase, GraduationCap, Github, Linkedin, Mail, Code, Users, Award, Globe, ChevronRight, User, Folder, FolderOpen } from 'lucide-react';
import { personalInfo, profile, education, experience, projects, skills, leadership, volunteering, languages, interests } from '../../data/resumeData';

type Section = 'profile' | 'experience' | 'education' | 'projects' | 'skills' | 'leadership' | 'volunteering' | 'languages';

const sidebarItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'About Me', icon: <User size={14} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={14} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={14} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={14} /> },
    { id: 'skills', label: 'Skills', icon: <FileText size={14} /> },
    { id: 'leadership', label: 'Leadership', icon: <Users size={14} /> },
    { id: 'volunteering', label: 'Volunteering', icon: <Award size={14} /> },
    { id: 'languages', label: 'Languages', icon: <Globe size={14} /> },
];

export const Finder = () => {
    const [activeSection, setActiveSection] = useState<Section>('profile');

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                                AS
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
                                <p className="text-lg text-gray-600 mt-1">AI Undergraduate | Doctreen Intern</p>
                                <div className="flex gap-4 mt-3 text-sm">
                                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                                        <Mail size={14} /> {personalInfo.email}
                                    </a>
                                </div>
                                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                    <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                                        <Linkedin size={14} /> LinkedIn
                                    </a>
                                    <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-900">
                                        <Github size={14} /> GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-2">Profile</h3>
                            <p className="text-gray-700 leading-relaxed">{profile}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="text-2xl font-bold text-blue-600">8.48</div>
                                <div className="text-sm text-gray-600">CGPA at Amrita</div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                <div className="text-2xl font-bold text-purple-600">6+</div>
                                <div className="text-sm text-gray-600">Major Projects</div>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                <div className="text-2xl font-bold text-green-600">3</div>
                                <div className="text-sm text-gray-600">Internships</div>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                                <div className="text-2xl font-bold text-orange-600">ACM</div>
                                <div className="text-sm text-gray-600">Former Chairman</div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {interests.map((interest, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{interest}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Briefcase size={24} className="text-blue-600" /> Experience
                        </h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                                        <p className="text-blue-600 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <div>{exp.timeline}</div>
                                        <div>{exp.location}</div>
                                    </div>
                                </div>
                                <ul className="mt-3 space-y-1">
                                    {exp.description.map((desc, j) => (
                                        <li key={j} className="text-gray-700 text-sm flex items-start gap-2">
                                            <ChevronRight size={14} className="mt-1 text-gray-400 shrink-0" />
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <GraduationCap size={24} className="text-green-600" /> Education
                        </h2>
                        {education.map((edu, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                                        <p className="text-gray-600">{edu.institution}</p>
                                        <p className="text-sm text-gray-500">{edu.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">{edu.timeline}</div>
                                        <div className="mt-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            {edu.score}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'projects':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Code size={24} className="text-purple-600" /> Projects
                        </h2>
                        <div className="grid gap-4">
                            {projects.map((project, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                                        <span className="text-sm text-gray-500">{project.timeline}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.skills.map((skill, j) => (
                                            <span key={j} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText size={24} className="text-orange-600" /> Skills
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-semibold text-gray-800 mb-3">Programming Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.programmingLanguages.map((s, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-semibold text-gray-800 mb-3">Frameworks</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.frameworks.map((s, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-semibold text-gray-800 mb-3">AI & Machine Learning</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.ai.map((s, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-semibold text-gray-800 mb-3">Tools & Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.tools.map((s, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-semibold text-gray-800 mb-3">Professional Values</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.values.map((s, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'leadership':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Users size={24} className="text-indigo-600" /> Leadership
                        </h2>
                        {leadership.map((item, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{item.role}</h3>
                                        <p className="text-indigo-600 font-medium">{item.organization}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <div>{item.timeline}</div>
                                        <div>{item.location}</div>
                                    </div>
                                </div>
                                <ul className="mt-3 space-y-1">
                                    {item.description.map((desc, j) => (
                                        <li key={j} className="text-gray-700 text-sm flex items-start gap-2">
                                            <ChevronRight size={14} className="mt-1 text-gray-400 shrink-0" />
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            case 'volunteering':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Award size={24} className="text-pink-600" /> Volunteering
                        </h2>
                        {volunteering.map((item, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{item.event}</h3>
                                        <p className="text-pink-600 font-medium">{item.role}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">{item.timeline}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'languages':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Globe size={24} className="text-teal-600" /> Languages
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {languages.map((lang, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow text-center">
                                    <h3 className="text-lg font-bold text-gray-900">{lang.language}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{lang.proficiency}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full bg-[#f5f5f7] flex font-sans text-gray-900">
            {/* Sidebar */}
            <div className="w-52 bg-[#e8e8ed]/80 backdrop-blur-sm border-r border-gray-300/50 flex flex-col pt-3 shrink-0">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Favorites</div>
                <div className="space-y-0.5 px-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${activeSection === item.id
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-200/70'
                                }`}
                        >
                            {activeSection === item.id ? <FolderOpen size={14} /> : <Folder size={14} />}
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6 bg-white">
                {renderContent()}
            </div>
        </div>
    );
};

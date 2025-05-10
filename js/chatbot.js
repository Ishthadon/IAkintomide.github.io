const botData = {
    name: "Israel Akintomide",
    education: {
        degree: "B.S in Computer Technology",
        concentration: "Applied Cybersecurity",
        school: "Bowie State University",
        graduation: "May 2024"
    },
    skills: [
        "Cybersecurity", "Network Security", "Penetration Testing",
        "Kali Linux", "Splunk", "Nmap", "Wireshark", "Nessus", "Metasploit",
        "Salesforce", "ServiceNow", "Zendesk", "Cloud Management",
        "AWS", "Office 365", "Windows/MacOS Administration",
        "VPN/RDP Configuration", "Active Directory Management"
    ],
    certifications: [
        "ISC2 Certified in Cybersecurity", 
        "CompTIA Network+",
        
    ],
    experience: [
        {
            position: "Help Desk Support",
            company: "Allied Universal Security",
            period: "Aug 2022 - Present",
            responsibilities: [
                "Responded to and resolved 10-20+ help desk tickets daily",
                "Managed active directory, changed passwords & unlocked accounts",
                "Documented information into ServiceNow and Microsoft Excel",
                "Reimaged workstations and troubleshoot technical issues"
            ]
        },
        {
            position: "IT Helpdesk Technician",
            company: "CashStash",
            period: "Jul 2020 - Aug 2021",
            responsibilities: [
                "Provided end-user support and technical issue resolution",
                "Modified configurations and software settings",
                "Reimaged workstations and provided technical assistance"
            ]
        }
    ],
    projects: [
        {
            name: "Network Analysis & Peer-to-Peer Service",
            description: "Analyzed network traffic and firewalls to bypass security measures for retail purchases",
            url: "https://aeroicaccounts.selly.store/"
        },
        {
            name: "Email re-verifier",
            description: "Developed a program to log into google accounts and sms verify accounts"
        },
        {
            name: "California Housing Affordability Trends",
            description: "Analyzed California housing affordability trends using American Community Survey (ACS) data, comparing 2017 vs 2022."
        }
    ]
};

class Chatbot {
    constructor() {
        this.data = botData;
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
            return `Hello! I'm Israel's virtual assistant. Ask me about his skills, experience, or projects.`;
        }
        
        if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
            return `${this.data.name} is pursuing a ${this.data.education.degree} with concentration in ${this.data.education.concentration} at ${this.data.education.school}, graduating ${this.data.education.graduation}.`;
        }
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
            return `${this.data.name}'s technical skills include: ${this.data.skills.join(', ')}.`;
        }

        if (lowerMessage.includes('certification') || lowerMessage.includes('cert')) {
            return `Certifications: ${this.data.certifications.join(', ')}`;
        }
        
        if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            let response = `${this.data.name}'s professional experience:\n`;
            this.data.experience.forEach(exp => {
                response += `\n${exp.position} at ${exp.company} (${exp.period}):\n`;
                response += `- ${exp.responsibilities.join('\n- ')}\n`;
            });
            return response;
        }

        if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            let response = `${this.data.name}'s notable projects:\n`;
            this.data.projects.forEach(proj => {
                response += `\n${proj.name}: ${proj.description}`;
                if (proj.url) response += `\nURL: ${proj.url}`;
                response += '\n';
            });
            return response;
        }

        if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
            return `You can contact Israel at Ish.akintomide@gmail.com or through the contact form.`;
        }

        return "I can tell you about Israel's education, skills, certifications, experience, or projects. What would you like to know?";
    }
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new Chatbot();
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat visibility
    chatToggle.addEventListener('click', () => {
        chatBox.classList.toggle('active');
        if (chatMessages.children.length === 0) {
            addMessage("Hi! I can answer questions about Israel's cybersecurity skills and experience. What would you like to know?", 'bot');
        }
    });

    // Close chat
    closeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });

    // Add message to chat
    function addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle user message
    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            const response = chatbot.processMessage(message);
            setTimeout(() => addMessage(response, 'bot'), 500);
            userInput.value = '';
        }
    }

    // Send message events
    sendMessage.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
});

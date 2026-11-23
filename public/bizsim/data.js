window.translations = {
    en: {
        ui: {
            title: "BizSim <span class=\"accent\">Tycoon</span>",
            subtitle: "Can you build the ultimate business empire?",
            labelName: "Business Name",
            labelProduct: "Main Product",
            labelFounder: "Founder Name",
            btnStart: "Start Your Journey",
            labelProfit: "Profit/Loss",
            labelTurn: "Turn",
            btnRoll: "Roll for Sales",
            btnContinue: "Continue",
            btnRestart: "Play Again",
            reportTitle: "Monthly Sales Report",
            reportSubtitle: "Time to see how the market responds!",
            hiringTitle: "Expand Your Team",
            hiringSubtitle: "Choose a new team member to join <span id=\"biz-name-span\"></span>",
            gameOver: "Game Over!",
            finalProfit: "Final Profit",
            quals: "Qualifications",
            history: "Work History",
            feedbackGood: "Great choice!",
            feedbackBad: "Oh no!",
            feedbackNeutral: "Okay.",
            hired: "Hired",
            rolled: "You rolled a",
            sales: "Sales",
            market: "Market",
            shop: "Shop",
            buy: "Buy",
            owned: "Owned",
            close: "Close"
        },
        marketTrends: {
            boom: { label: "Boom", desc: "Economy is booming! Profits x1.5" },
            stable: { label: "Stable", desc: "Market is stable. Normal profits." },
            recession: { label: "Recession", desc: "Economy is down. Profits x0.5" },
            volatile: { label: "Volatile", desc: "Market is unstable. High risk!" }
        },
        upgrades: [
            { id: "coffee", name: "Coffee Machine", cost: 500, multiplier: 0.1, desc: "+10% Profit Efficiency" },
            { id: "marketing", name: "Marketing Team", cost: 1500, multiplier: 0.25, desc: "+25% Profit Efficiency" },
            { id: "ai", name: "AI Consultant", cost: 3000, multiplier: 0.5, desc: "+50% Profit Efficiency" }
        ],
        rankings: {
            beginner: "Beginner",
            streetVendor: "Street Vendor",
            shopOwner: "Shop Owner",
            entrepreneur: "Entrepreneur",
            tycoon: "Tycoon"
        },
        feedback: {
            scenarios: {
                great: "You have a natural instinct for business! Your decisions were spot on.",
                good: "You made some solid choices, but there's room for improvement.",
                bad: "It was a rough ride. You might want to rethink your strategy next time."
            },
            hiring: {
                great: "You built a dream team! Your employees drove your success.",
                good: "Your team was decent, but a few bad apples held you back.",
                bad: "Your hiring process needs work. Too many wrong fits."
            }
        },
        scenarios: [
            {
                id: 1,
                text: "You need a logo for your new business. How do you get one?",
                options: [
                    { text: "Hire a professional designer", type: "good", impact: 200, feedback: "Great branding attracted high-paying clients! (Profit +200)" },
                    { text: "Draw it yourself on a napkin", type: "bad", impact: -100, feedback: "It looks unprofessional. You lost some initial sales." },
                    { text: "Use a free online generator", type: "neutral", impact: 50, feedback: "It works. You made a small profit." }
                ]
            },
            {
                id: 2,
                text: "You need to buy initial stock. What quality do you choose?",
                options: [
                    { text: "High quality, high cost", type: "good", impact: 500, feedback: "Customers love the quality! Sales are booming. (Profit +500)" },
                    { text: "Cheap and low quality", type: "bad", impact: -200, feedback: "Items break immediately. Refunds are costing you." },
                    { text: "Mid-range standard goods", type: "neutral", impact: 100, feedback: "Solid sales. Steady profit." }
                ]
            },
            {
                id: 3,
                text: "A customer asks for a discount on their first order.",
                options: [
                    { text: "Refuse politely", type: "neutral", impact: 100, feedback: "They bought it anyway. Full margin." },
                    { text: "Give a small 10% discount", type: "good", impact: 300, feedback: "They referred 3 friends! Volume sales increased. (Profit +300)" },
                    { text: "Give it for free to get exposure", type: "bad", impact: -100, feedback: "They took the freebie and vanished." }
                ]
            },
            {
                id: 4,
                text: "Your internet goes down on launch day!",
                options: [
                    { text: "Panic and close for the day", type: "bad", impact: -200, feedback: "Lost a day of sales." },
                    { text: "Use your phone's hotspot", type: "good", impact: 150, feedback: "You kept processing orders! (Profit +150)" },
                    { text: "Go to a cafe", type: "neutral", impact: 0, feedback: "Broke even after paying for coffee." }
                ]
            },
            {
                id: 5,
                text: "A local influencer wants to promote your product for a fee.",
                options: [
                    { text: "Pay them RM500", type: "good", impact: 1000, feedback: "The post went viral! Huge ROI. (Profit +1000)" },
                    { text: "Ignore them", type: "neutral", impact: 0, feedback: "No change in sales." },
                    { text: "Insult them for asking", type: "bad", impact: -300, feedback: "They posted a hate video. You lost customers." }
                ]
            },
            {
                id: 6,
                text: "You have a pile of paperwork to organize.",
                options: [
                    { text: "Do it all weekend", type: "good", impact: 200, feedback: "You found an uncashed check! (Profit +200)" },
                    { text: "Throw it in a drawer", type: "bad", impact: -300, feedback: "You missed a tax deadline. Fined." },
                    { text: "Hire a temp for the day", type: "neutral", impact: 0, feedback: "Cost money, but saved time. Broke even." }
                ]
            },
            {
                id: 7,
                text: "A competitor copies your product idea.",
                options: [
                    { text: "Sues them immediately", type: "bad", impact: -1000, feedback: "Legal fees drained your account." },
                    { text: "Innovate and improve yours", type: "good", impact: 800, feedback: "Your new version crushed them. (Profit +800)" },
                    { text: "Ignore it", type: "neutral", impact: 0, feedback: "Market share split." }
                ]
            },
            {
                id: 8,
                text: "A customer leaves a 1-star review.",
                options: [
                    { text: "Reply angrily", type: "bad", impact: -200, feedback: "Scared away potential buyers." },
                    { text: "Apologize and offer a fix", type: "good", impact: 100, feedback: "They changed it to 5 stars! Sales recovered. (Profit +100)" },
                    { text: "Delete the review", type: "neutral", impact: 0, feedback: "It's still there, buried." }
                ]
            },
            {
                id: 9,
                text: "Your supplier raises prices by 20%.",
                options: [
                    { text: "Switch to a cheaper, worse supplier", type: "bad", impact: -500, feedback: "Quality dropped, returns skyrocketed." },
                    { text: "Negotiate a smaller increase", type: "good", impact: 200, feedback: "You kept margins high and quality good. (Profit +200)" },
                    { text: "Absorb the cost", type: "neutral", impact: -100, feedback: "Less profit per unit." }
                ]
            },
            {
                id: 10,
                text: "You need to advertise.",
                options: [
                    { text: "Social Media Ads", type: "good", impact: 1500, feedback: "Targeted ads worked perfectly! (Profit +1500)" },
                    { text: "Flyers on cars", type: "bad", impact: -200, feedback: "Rain ruined them. Waste of money." },
                    { text: "Local Newspaper", type: "neutral", impact: 100, feedback: "Small bump in sales." }
                ]
            },
            {
                id: 11,
                text: "Equipment breakdown! Your main computer died.",
                options: [
                    { text: "Buy the latest top-spec model", type: "good", impact: 500, feedback: "Productivity doubled! It paid for itself. (Profit +500)" },
                    { text: "Buy a used one", type: "neutral", impact: 0, feedback: "Back to work. No gain, no loss." },
                    { text: "Try to fix it yourself", type: "bad", impact: -300, feedback: "You broke it more. Had to buy a new one anyway." }
                ]
            },
            {
                id: 12,
                text: "You're feeling burnt out.",
                options: [
                    { text: "Take a vacation", type: "neutral", impact: -200, feedback: "Cost money, but you're rested." },
                    { text: "Push through it", type: "bad", impact: -500, feedback: "Made a costly mistake due to fatigue." },
                    { text: "Delegate tasks and rest weekends", type: "good", impact: 300, feedback: "Team stepped up, you recovered. Efficiency up! (Profit +300)" }
                ]
            },
            {
                id: 13,
                text: "A big holiday is coming up.",
                options: [
                    { text: "Run a themed sale", type: "good", impact: 2000, feedback: "Huge volume! Best month ever. (Profit +2000)" },
                    { text: "Do nothing", type: "neutral", impact: 100, feedback: "Standard holiday sales." },
                    { text: "Raise prices", type: "bad", impact: -500, feedback: "Customers went to competitors." }
                ]
            },
            {
                id: 14,
                text: "Tax season is here.",
                options: [
                    { text: "Hire an accountant", type: "good", impact: 500, feedback: "They found a huge refund for you! (Profit +500)" },
                    { text: "Do it yourself last minute", type: "bad", impact: -1000, feedback: "Errors led to a fine." },
                    { text: "Use software", type: "neutral", impact: 0, feedback: "Filed correctly. No drama." }
                ]
            },
            {
                id: 15,
                text: "An investor offers you money for 50% of your company.",
                options: [
                    { text: "Accept immediately", type: "bad", impact: 500, feedback: "You got cash, but sold equity too cheap. (Profit +500)" },
                    { text: "Decline politely", type: "good", impact: 1000, feedback: "You kept 100% of the profits! Organic growth. (Profit +1000)" },
                    { text: "Negotiate for 10%", type: "neutral", impact: 800, feedback: "Good balance. (Profit +800)" }
                ]
            },
            {
                id: 16,
                text: "Your website crashed during a sale.",
                options: [
                    { text: "Upgrade hosting plan", type: "good", impact: 400, feedback: "Site is faster than ever. Sales up! (Profit +400)" },
                    { text: "Blame the internet provider", type: "bad", impact: -200, feedback: "Customers left." },
                    { text: "Wait it out", type: "neutral", impact: -100, feedback: "Lost some sales." }
                ]
            },
            {
                id: 17,
                text: "You have extra profit this month.",
                options: [
                    { text: "Reinvest in R&D", type: "good", impact: 1500, feedback: "New product feature is a hit! (Profit +1500)" },
                    { text: "Buy a fancy office chair", type: "neutral", impact: -200, feedback: "Comfy, but cost money." },
                    { text: "Throw a party", type: "bad", impact: -500, feedback: "Fun, but expensive." }
                ]
            },
            {
                id: 18,
                text: "A customer wants to return a used item.",
                options: [
                    { text: "Accept it to keep peace", type: "neutral", impact: -50, feedback: "Small loss." },
                    { text: "Refuse, citing policy", type: "bad", impact: -100, feedback: "Bad review." },
                    { text: "Offer store credit", type: "good", impact: 200, feedback: "They bought more items! (Profit +200)" }
                ]
            },
            {
                id: 19,
                text: "Local charity asks for a donation.",
                options: [
                    { text: "Donate RM500", type: "good", impact: 300, feedback: "Great PR! Community supported you back. (Profit +300)" },
                    { text: "Refuse", type: "neutral", impact: 0, feedback: "Saved cash." },
                    { text: "Donate expired product", type: "bad", impact: -500, feedback: "PR disaster." }
                ]
            },
            {
                id: 20,
                text: "You need to ship orders faster.",
                options: [
                    { text: "Hire a logistics company", type: "good", impact: 600, feedback: "Customers love the speed. Repeat orders! (Profit +600)" },
                    { text: "Drive them yourself", type: "neutral", impact: 0, feedback: "Saved money, lost time." },
                    { text: "Make customers wait", type: "bad", impact: -300, feedback: "Cancellations." }
                ]
            },
            {
                id: 21,
                text: "A new social media trend is blowing up.",
                options: [
                    { text: "Jump on the trend", type: "good", impact: 1000, feedback: "Viral hit! Sales exploded. (Profit +1000)" },
                    { text: "Ignore it, it's silly", type: "neutral", impact: 0, feedback: "Missed out." },
                    { text: "Mock the trend", type: "bad", impact: -200, feedback: "Backlash." }
                ]
            },
            {
                id: 22,
                text: "Office rent is increasing.",
                options: [
                    { text: "Move to a cheaper location", type: "neutral", impact: 100, feedback: "Saved a bit." },
                    { text: "Go remote/Work from home", type: "good", impact: 800, feedback: "Saved huge on rent! (Profit +800)" },
                    { text: "Stay and pay", type: "bad", impact: -500, feedback: "Profits down." }
                ]
            },
            {
                id: 23,
                text: "You found a cheaper material supplier.",
                options: [
                    { text: "Switch immediately", type: "bad", impact: -1000, feedback: "Quality was awful. Recalls." },
                    { text: "Test a sample first", type: "good", impact: 400, feedback: "Found a good balance. Margins up. (Profit +400)" },
                    { text: "Stick with current one", type: "neutral", impact: 0, feedback: "Status quo." }
                ]
            },
            {
                id: 24,
                text: "An employee is constantly late.",
                options: [
                    { text: "Fire them on the spot", type: "bad", impact: -800, feedback: "Lawsuit risk." },
                    { text: "Have a constructive talk", type: "good", impact: 300, feedback: "They improved and sold more! (Profit +300)" },
                    { text: "Ignore it", type: "neutral", impact: -100, feedback: "Productivity down." }
                ]
            },
            {
                id: 25,
                text: "You have a chance to export to a new country.",
                options: [
                    { text: "Go for it!", type: "good", impact: 3000, feedback: "Huge success! International sales. (Profit +3000)" },
                    { text: "Too risky", type: "neutral", impact: 0, feedback: "Played it safe." },
                    { text: "Do it without research", type: "bad", impact: -2000, feedback: "Customs issues. Lost goods." }
                ]
            },
            {
                id: 26,
                text: "Data leak! Customer emails exposed.",
                options: [
                    { text: "Hide it", type: "bad", impact: -1000, feedback: "Trust destroyed." },
                    { text: "Inform customers and fix it", type: "good", impact: -50, feedback: "Cost money, but saved reputation. (Loss -50)" },
                    { text: "Blame a hacker", type: "neutral", impact: -500, feedback: "People are skeptical." }
                ]
            },
            {
                id: 27,
                text: "A rival offers to buy your business.",
                options: [
                    { text: "Sell for a low price", type: "bad", impact: 1000, feedback: "You sold out too cheap. (Profit +1000)" },
                    { text: "Refuse", type: "neutral", impact: 0, feedback: "Kept building." },
                    { text: "Wait for a better offer", type: "good", impact: 3000, feedback: "Valuation increased! (Profit +3000)" }
                ]
            },
            {
                id: 28,
                text: "You want to launch a second product.",
                options: [
                    { text: "Rush it out", type: "bad", impact: -500, feedback: "Flop." },
                    { text: "Do market research first", type: "good", impact: 1200, feedback: "Bestseller! (Profit +1200)" },
                    { text: "Copy your first product", type: "neutral", impact: 100, feedback: "Small sales." }
                ]
            },
            {
                id: 29,
                text: "Eco-friendly packaging is trending.",
                options: [
                    { text: "Switch to green packaging", type: "good", impact: 600, feedback: "Sales up due to green image! (Profit +600)" },
                    { text: "Stick to plastic", type: "bad", impact: -200, feedback: "Boycotts." },
                    { text: "Greenwash (lie about it)", type: "bad", impact: -1000, feedback: "Caught lying." }
                ]
            },
            {
                id: 30,
                text: "Final push! It's the end of the year.",
                options: [
                    { text: "Launch massive campaign", type: "good", impact: 1500, feedback: "Huge success! Finished strong. (Profit +1500)" },
                    { text: "Close early for holidays", type: "bad", impact: -500, feedback: "Missed the holiday rush." },
                    { text: "Standard hours", type: "neutral", impact: 200, feedback: "Steady sales to end the year. (Profit +200)" }
                ]
            }
        ],
        hiringRounds: [
            [ // Round 1: Assistant
                {
                    name: "Alex",
                    role: "Assistant",
                    type: "good",
                    cost: 500,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["Diploma in Business Admin", "Certified Office Manager"],
                    history: [
                        { role: "Jr. Admin", company: "TechCorp", duration: "2 years" },
                        { role: "Receptionist", company: "Hotel Luxe", duration: "1.5 years" },
                        { role: "Intern", company: "StartUp Inc", duration: "6 months" }
                    ],
                    profile: "I am a highly organized professional looking for a long-term opportunity to grow with a dynamic team."
                },
                {
                    name: "Ben",
                    role: "Assistant",
                    type: "bad",
                    cost: -200,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["High School Diploma", "Online Course in Crypto Trading"],
                    history: [
                        { role: "Admin", company: "Company A", duration: "2 months" },
                        { role: "Server", company: "Cafe B", duration: "3 months" },
                        { role: "Sales", company: "Shop C", duration: "1 month" }
                    ],
                    profile: "I'm just looking for something to pay the bills while I work on my side hustle."
                },
                {
                    name: "Charlie",
                    role: "Assistant",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["High School Diploma"],
                    history: [
                        { role: "Clerk", company: "Retail Store", duration: "4 years" },
                        { role: "Cashier", company: "Supermarket", duration: "2 years" },
                        { role: "Student", company: "College", duration: "2 years" }
                    ],
                    profile: "I am a reliable worker who shows up on time and does what is asked."
                }
            ],
            [ // Round 2: Marketer
                {
                    name: "Sarah",
                    role: "Marketer",
                    type: "good",
                    cost: 1000,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["BA in Marketing", "Google Analytics Certified"],
                    history: [
                        { role: "Social Media Mgr", company: "BrandX", duration: "3 years" },
                        { role: "Content Creator", company: "Freelance", duration: "2 years" },
                        { role: "Marketing Intern", company: "Agency Y", duration: "1 year" }
                    ],
                    profile: "Passionate about data-driven storytelling and building authentic community engagement."
                },
                {
                    name: "Sam",
                    role: "Marketer",
                    type: "bad",
                    cost: -500,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["Self-taught", "Influencer Academy"],
                    history: [
                        { role: "Brand Amb.", company: "ScamCoin", duration: "3 weeks" },
                        { role: "Promoter", company: "Club Z", duration: "2 months" },
                        { role: "Unemployed", company: "-", duration: "6 months" }
                    ],
                    profile: "I make things go viral. I don't believe in rules, just results. #Hustle"
                },
                {
                    name: "Sid",
                    role: "Marketer",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["BA in Communications"],
                    history: [
                        { role: "PR Assistant", company: "Firm A", duration: "1 year" },
                        { role: "Writer", company: "Blog B", duration: "1 year" },
                        { role: "Sales", company: "Shop C", duration: "1 year" }
                    ],
                    profile: "I have a degree in communications and I am ready to learn the ropes of digital marketing."
                }
            ],
            [ // Round 3: Manager
                {
                    name: "Mike",
                    role: "Manager",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["MBA", "PMP Certification"],
                    history: [
                        { role: "Project Mgr", company: "BigCorp", duration: "5 years" },
                        { role: "Analyst", company: "Bank A", duration: "3 years" },
                        { role: "Consultant", company: "Firm B", duration: "2 years" }
                    ],
                    profile: "I believe in strict adherence to process and protocol to ensure consistent results."
                },
                {
                    name: "Molly",
                    role: "Manager",
                    type: "good",
                    cost: 2000,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["BSc Psychology", "Leadership Workshop"],
                    history: [
                        { role: "Team Lead", company: "TechStart", duration: "4 years" },
                        { role: "HR Specialist", company: "PeopleCo", duration: "3 years" },
                        { role: "Recruiter", company: "Agency X", duration: "2 years" }
                    ],
                    profile: "My focus is on empowering the team and fostering a culture of innovation and trust."
                },
                {
                    name: "Max",
                    role: "Manager",
                    type: "bad",
                    cost: -1000,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["None listed"],
                    history: [
                        { role: "CEO", company: "Failed Startup 1", duration: "1 year" },
                        { role: "CEO", company: "Failed Startup 2", duration: "8 months" },
                        { role: "Manager", company: "Dad's Company", duration: "6 months" }
                    ],
                    profile: "I'm a visionary leader who knows better than everyone else. I just need a team who listens."
                }
            ],
            [ // Round 4: Tech Lead
                {
                    name: "Tina",
                    role: "Tech Lead",
                    type: "bad",
                    cost: -2000,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["Bootcamp Grad (Incomplete)"],
                    history: [
                        { role: "CTO", company: "Stealth Mode", duration: "3 months" },
                        { role: "Dev", company: "Freelance", duration: "1 month" },
                        { role: "Intern", company: "Google (1 week)", duration: "1 week" }
                    ],
                    profile: "I'm basically a genius. I can code anything in a weekend. Trust me."
                },
                {
                    name: "Tim",
                    role: "Tech Lead",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["BSc Computer Science"],
                    history: [
                        { role: "Developer", company: "SoftCo", duration: "3 years" },
                        { role: "Jr Dev", company: "WebAgency", duration: "2 years" },
                        { role: "Support", company: "IT Firm", duration: "1 year" }
                    ],
                    profile: "I write clean, maintainable code and prefer stability over experimental tech."
                },
                {
                    name: "Tess",
                    role: "Tech Lead",
                    type: "good",
                    cost: 3000,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["MSc Software Eng", "AWS Architect"],
                    history: [
                        { role: "Sr. Eng", company: "Unicorn Inc", duration: "4 years" },
                        { role: "DevOps", company: "CloudSys", duration: "2 years" },
                        { role: "Developer", company: "AppStudio", duration: "2 years" }
                    ],
                    profile: "I love solving complex problems and building scalable systems that last."
                }
            ],
            [ // Round 5: Partner
                {
                    name: "Pat",
                    role: "Partner",
                    type: "good",
                    cost: 5000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["Serial Entrepreneur", "MBA Harvard"],
                    history: [
                        { role: "Founder", company: "SoldIt Inc", duration: "Exit: $10M" },
                        { role: "VP Sales", company: "Global Corp", duration: "5 years" },
                        { role: "Board Member", company: "NonProfit", duration: "Current" }
                    ],
                    profile: "I bring capital, connections, and a track record of successful exits."
                },
                {
                    name: "Paul",
                    role: "Partner",
                    type: "neutral",
                    cost: 1000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["Inherited Wealth"],
                    history: [
                        { role: "Investor", company: "Various", duration: "5 years" },
                        { role: "Student", company: "Art School", duration: "4 years" },
                        { role: "None", company: "Gap Year", duration: "2 years" }
                    ],
                    profile: "I have money to invest and I think your business looks fun."
                },
                {
                    name: "Pete",
                    role: "Partner",
                    type: "bad",
                    cost: -5000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["School of Hard Knocks"],
                    history: [
                        { role: "Director", company: "Shell Corp", duration: "Unknown" },
                        { role: "Trader", company: "Offshore Ltd", duration: "2 years" },
                        { role: "Consultant", company: "Bankrupt Co", duration: "1 year" }
                    ],
                    profile: "I can help you wash... I mean, manage your profits efficiently. Cash only."
                }
            ]
        ],
        roulette: {
            title: "Market Volatility!",
            desc: "The market is unstable! Spin the wheel to test your luck.",
            betRed: "Bet Red",
            betBlack: "Bet Black",
            resultNum: "Result:",
            won: "You won!",
            lost: "You lost!",
            volatile: "Volatile"
        }
    },
    zh: {
        ui: {
            title: "BizSim <span class=\"accent\">大亨</span>",
            subtitle: "你能建立终极商业帝国吗？",
            labelName: "企业名称",
            labelProduct: "主要产品",
            labelFounder: "创始人姓名",
            btnStart: "开始旅程",
            labelProfit: "利润/亏损",
            labelTurn: "回合",
            btnRoll: "掷骰子销售",
            btnContinue: "继续",
            btnRestart: "再玩一次",
            reportTitle: "月度销售报告",
            reportSubtitle: "看看市场反应如何！",
            hiringTitle: "扩充团队",
            hiringSubtitle: "选择一名新成员加入 <span id=\"biz-name-span\"></span>",
            gameOver: "游戏结束！",
            finalProfit: "最终利润",
            quals: "资格证书",
            history: "工作经历",
            feedbackGood: "很棒的选择！",
            feedbackBad: "糟糕！",
            feedbackNeutral: "好的。",
            hired: "已录用",
            rolled: "你掷出了",
            sales: "销售额",
            market: "市场",
            shop: "商店",
            buy: "购买",
            owned: "已拥有",
            close: "关闭"
        },
        marketTrends: {
            boom: { label: "繁荣", desc: "经济繁荣！利润 x1.5" },
            stable: { label: "稳定", desc: "市场稳定。正常利润。" },
            recession: { label: "衰退", desc: "经济下滑。利润 x0.5" },
            volatile: { label: "波动", desc: "市场不稳定。高风险！" }
        },
        roulette: {
            title: "市场波动！",
            desc: "市场不稳定！转动轮盘试试运气。",
            betRed: "押红色",
            betBlack: "押黑色",
            resultNum: "结果：",
            won: "你赢了！",
            lost: "你输了！",
            volatile: "波动"
        },
        upgrades: [
            { id: "coffee", name: "咖啡机", cost: 500, multiplier: 0.1, desc: "+10% 利润效率" },
            { id: "marketing", name: "营销团队", cost: 1500, multiplier: 0.25, desc: "+25% 利润效率" },
            { id: "ai", name: "AI 顾问", cost: 3000, multiplier: 0.5, desc: "+50% 利润效率" }
        ],
        rankings: {
            beginner: "初学者",
            vendor: "街头小贩",
            entrepreneur: "企业家",
            marketLeader: "市场领袖",
            billionaire: "亿万富翁"
        },
        feedback: {
            scenarios: {
                great: "你天生就是做生意的料！你的决策非常精准。",
                good: "你做了一些不错的选择，但还有提升空间。",
                bad: "这是一段艰难的旅程。下次你可能需要重新考虑你的策略。"
            },
            hiring: {
                great: "你建立了一支梦之队！你的员工推动了你的成功。",
                good: "你的团队还不错，但有几个不合适的人拖了后腿。",
                bad: "你的招聘流程需要改进。太多不合适的人了。"
            }
        },
        scenarios: [
            {
                id: 1,
                text: "你的新公司需要一个标志。你打算怎么做？",
                options: [
                    { text: "聘请专业设计师", type: "good", impact: 200, feedback: "优秀的品牌形象吸引了高薪客户！（利润 +200）" },
                    { text: "自己在餐巾纸上画一个", type: "bad", impact: -100, feedback: "看起来很不专业。你失去了一些初始销售额。" },
                    { text: "使用免费的在线生成器", type: "neutral", impact: 50, feedback: "勉强能用。你赚了一点小利。" }
                ]
            },
            {
                id: 2,
                text: "你需要购买初始库存。你选择什么质量？",
                options: [
                    { text: "高质量，高成本", type: "good", impact: 500, feedback: "客户喜欢这个质量！销售额激增。（利润 +500）" },
                    { text: "廉价且低质量", type: "bad", impact: -200, feedback: "商品很快就坏了。退款让你损失惨重。" },
                    { text: "中档标准商品", type: "neutral", impact: 100, feedback: "销售稳定。利润稳定。" }
                ]
            },
            {
                id: 3,
                text: "客户要求第一笔订单打折。",
                options: [
                    { text: "礼貌拒绝", type: "neutral", impact: 100, feedback: "他们还是买了。全额利润。" },
                    { text: "给予10%的小折扣", type: "good", impact: 300, feedback: "他们推荐了3个朋友！销量增加。（利润 +300）" },
                    { text: "免费赠送以获得曝光", type: "bad", impact: -100, feedback: "他们拿了赠品就消失了。" }
                ]
            },
            {
                id: 4,
                text: "发布当天你的网络断了！",
                options: [
                    { text: "惊慌失措，关门一天", type: "bad", impact: -200, feedback: "损失了一天的销售额。" },
                    { text: "使用手机热点", type: "good", impact: 150, feedback: "你坚持处理订单！（利润 +150）" },
                    { text: "去咖啡馆", type: "neutral", impact: 0, feedback: "付了咖啡钱后收支平衡。" }
                ]
            },
            {
                id: 5,
                text: "一位当地网红想收费推广你的产品。",
                options: [
                    { text: "支付RM500", type: "good", impact: 1000, feedback: "帖子火了！投资回报率巨大。（利润 +1000）" },
                    { text: "无视他们", type: "neutral", impact: 0, feedback: "销售额没有变化。" },
                    { text: "羞辱他们", type: "bad", impact: -300, feedback: "他们发了仇恨视频。你失去了一些客户。" }
                ]
            },
            {
                id: 6,
                text: "你有一堆文书工作要整理。",
                options: [
                    { text: "整个周末都在做", type: "good", impact: 200, feedback: "你发现了一张未兑现的支票！（利润 +200）" },
                    { text: "扔进抽屉里", type: "bad", impact: -300, feedback: "你错过了报税截止日期。被罚款。" },
                    { text: "雇个临时工做一天", type: "neutral", impact: 0, feedback: "花了钱，但省了时间。收支平衡。" }
                ]
            },
            {
                id: 7,
                text: "竞争对手抄袭了你的产品创意。",
                options: [
                    { text: "立即起诉", type: "bad", impact: -1000, feedback: "法律费用耗尽了你的账户。" },
                    { text: "创新并改进你的产品", type: "good", impact: 800, feedback: "你的新版本击败了他们。（利润 +800）" },
                    { text: "无视它", type: "neutral", impact: 0, feedback: "市场份额平分。" }
                ]
            },
            {
                id: 8,
                text: "一位客户留下了1星评价。",
                options: [
                    { text: "愤怒地回复", type: "bad", impact: -200, feedback: "吓跑了潜在买家。" },
                    { text: "道歉并提供解决方案", type: "good", impact: 100, feedback: "他们改成了5星！销售恢复。（利润 +100）" },
                    { text: "删除评论", type: "neutral", impact: 0, feedback: "它还在那里，只是被埋没了。" }
                ]
            },
            {
                id: 9,
                text: "你的供应商涨价20%。",
                options: [
                    { text: "换一个更便宜、更差的供应商", type: "bad", impact: -500, feedback: "质量下降，退货激增。" },
                    { text: "谈判较小的涨幅", type: "good", impact: 200, feedback: "你保持了高利润和好质量。（利润 +200）" },
                    { text: "承担成本", type: "neutral", impact: -100, feedback: "单位利润减少。" }
                ]
            },
            {
                id: 10,
                text: "你需要做广告。",
                options: [
                    { text: "社交媒体广告", type: "good", impact: 1500, feedback: "定向广告效果完美！（利润 +1500）" },
                    { text: "在车上发传单", type: "bad", impact: -200, feedback: "下雨毁了它们。浪费钱。" },
                    { text: "当地报纸", type: "neutral", impact: 100, feedback: "销售额小幅增长。" }
                ]
            },
            {
                id: 11,
                text: "设备故障！你的主电脑坏了。",
                options: [
                    { text: "购买最新的顶级型号", type: "good", impact: 500, feedback: "生产力翻倍！物超所值。（利润 +500）" },
                    { text: "买个二手的", type: "neutral", impact: 0, feedback: "继续工作。无得无失。" },
                    { text: "尝试自己修理", type: "bad", impact: -300, feedback: "你把它弄得更坏了。不得不买个新的。" }
                ]
            },
            {
                id: 12,
                text: "你感到精疲力竭。",
                options: [
                    { text: "去度假", type: "neutral", impact: -200, feedback: "花了钱，但你休息好了。" },
                    { text: "硬撑", type: "bad", impact: -500, feedback: "因疲劳犯了昂贵的错误。" },
                    { text: "授权任务并周末休息", type: "good", impact: 300, feedback: "团队挺身而出，你恢复了。效率提升！（利润 +300）" }
                ]
            },
            {
                id: 13,
                text: "一个大节日快到了。",
                options: [
                    { text: "举办主题促销", type: "good", impact: 2000, feedback: "销量巨大！有史以来最好的一个月。（利润 +2000）" },
                    { text: "什么都不做", type: "neutral", impact: 100, feedback: "标准的假日销售。" },
                    { text: "涨价", type: "bad", impact: -500, feedback: "客户去了竞争对手那里。" }
                ]
            },
            {
                id: 14,
                text: "报税季到了。",
                options: [
                    { text: "聘请会计师", type: "good", impact: 500, feedback: "他们为你发现了一大笔退税！（利润 +500）" },
                    { text: "最后一刻自己做", type: "bad", impact: -1000, feedback: "错误导致罚款。" },
                    { text: "使用软件", type: "neutral", impact: 0, feedback: "正确申报。没有意外。" }
                ]
            },
            {
                id: 15,
                text: "一位投资者提议收购你公司50%的股份。",
                options: [
                    { text: "立即接受", type: "bad", impact: 500, feedback: "你得到了现金，但股权卖得太便宜了。（利润 +500）" },
                    { text: "礼貌拒绝", type: "good", impact: 1000, feedback: "你保留了100%的利润！有机增长。（利润 +1000）" },
                    { text: "谈判10%", type: "neutral", impact: 800, feedback: "良好的平衡。（利润 +800）" }
                ]
            },
            {
                id: 16,
                text: "促销期间你的网站崩溃了。",
                options: [
                    { text: "升级主机方案", type: "good", impact: 400, feedback: "网站比以往任何时候都快。销量上升！（利润 +400）" },
                    { text: "责怪互联网提供商", type: "bad", impact: -200, feedback: "客户离开了。" },
                    { text: "等待恢复", type: "neutral", impact: -100, feedback: "损失了一些销售额。" }
                ]
            },
            {
                id: 17,
                text: "这个月你有额外的利润。",
                options: [
                    { text: "再投资于研发", type: "good", impact: 1500, feedback: "新产品功能大受欢迎！（利润 +1500）" },
                    { text: "买把豪华办公椅", type: "neutral", impact: -200, feedback: "舒服，但花了钱。" },
                    { text: "开派对", type: "bad", impact: -500, feedback: "好玩，但昂贵。" }
                ]
            },
            {
                id: 18,
                text: "一位客户想退回使用过的商品。",
                options: [
                    { text: "为了息事宁人接受", type: "neutral", impact: -50, feedback: "小损失。" },
                    { text: "引用政策拒绝", type: "bad", impact: -100, feedback: "差评。" },
                    { text: "提供商店信用", type: "good", impact: 200, feedback: "他们买了更多东西！（利润 +200）" }
                ]
            },
            {
                id: 19,
                text: "当地慈善机构请求捐款。",
                options: [
                    { text: "捐赠RM500", type: "good", impact: 300, feedback: "很棒的公关！社区支持你。（利润 +300）" },
                    { text: "拒绝", type: "neutral", impact: 0, feedback: "省了现金。" },
                    { text: "捐赠过期产品", type: "bad", impact: -500, feedback: "公关灾难。" }
                ]
            },
            {
                id: 20,
                text: "你需要更快地发货。",
                options: [
                    { text: "聘请物流公司", type: "good", impact: 600, feedback: "客户喜欢这个速度。重复订单！（利润 +600）" },
                    { text: "自己开车送", type: "neutral", impact: 0, feedback: "省了钱，浪费了时间。" },
                    { text: "让客户等待", type: "bad", impact: -300, feedback: "取消订单。" }
                ]
            },
            {
                id: 21,
                text: "一个新的社交媒体趋势正在爆发。",
                options: [
                    { text: "跟风", type: "good", impact: 1000, feedback: "病毒式传播！销量爆炸。（利润 +1000）" },
                    { text: "无视它，太傻了", type: "neutral", impact: 0, feedback: "错过了机会。" },
                    { text: "嘲笑这个趋势", type: "bad", impact: -200, feedback: "遭到强烈反对。" }
                ]
            },
            {
                id: 22,
                text: "办公室租金在上涨。",
                options: [
                    { text: "搬到便宜的地方", type: "neutral", impact: 100, feedback: "省了一点。" },
                    { text: "远程办公/在家工作", type: "good", impact: 800, feedback: "省了大笔租金！（利润 +800）" },
                    { text: "留下来付钱", type: "bad", impact: -500, feedback: "利润下降。" }
                ]
            },
            {
                id: 23,
                text: "你发现了一个更便宜的材料供应商。",
                options: [
                    { text: "立即切换", type: "bad", impact: -1000, feedback: "质量太差。召回。" },
                    { text: "先测试样品", type: "good", impact: 400, feedback: "找到了平衡点。利润率上升。（利润 +400）" },
                    { text: "坚持使用当前的", type: "neutral", impact: 0, feedback: "维持现状。" }
                ]
            },
            {
                id: 24,
                text: "一名员工经常迟到。",
                options: [
                    { text: "当场解雇", type: "bad", impact: -800, feedback: "诉讼风险。" },
                    { text: "进行建设性谈话", type: "good", impact: 300, feedback: "他们改进了并卖出了更多！（利润 +300）" },
                    { text: "无视它", type: "neutral", impact: -100, feedback: "生产力下降。" }
                ]
            },
            {
                id: 25,
                text: "你有机会出口到一个新国家。",
                options: [
                    { text: "去吧！", type: "good", impact: 3000, feedback: "巨大成功！国际销售。（利润 +3000）" },
                    { text: "太冒险", type: "neutral", impact: 0, feedback: "求稳。" },
                    { text: "不做研究就做", type: "bad", impact: -2000, feedback: "海关问题。货物丢失。" }
                ]
            },
            {
                id: 26,
                text: "数据泄露！客户邮件被曝光。",
                options: [
                    { text: "隐瞒", type: "bad", impact: -1000, feedback: "信任被摧毁。" },
                    { text: "通知客户并修复", type: "good", impact: -50, feedback: "花了钱，但挽救了声誉。（损失 -50）" },
                    { text: "责怪黑客", type: "neutral", impact: -500, feedback: "人们表示怀疑。" }
                ]
            },
            {
                id: 27,
                text: "竞争对手提议收购你的业务。",
                options: [
                    { text: "低价出售", type: "bad", impact: 1000, feedback: "你卖得太便宜了。（利润 +1000）" },
                    { text: "拒绝", type: "neutral", impact: 0, feedback: "继续建设。" },
                    { text: "等待更好的报价", type: "good", impact: 3000, feedback: "估值增加了！（利润 +3000）" }
                ]
            },
            {
                id: 28,
                text: "你想推出第二款产品。",
                options: [
                    { text: "匆忙推出", type: "bad", impact: -500, feedback: "失败。" },
                    { text: "先做市场调查", type: "good", impact: 1200, feedback: "畅销品！（利润 +1200）" },
                    { text: "复制你的第一个产品", type: "neutral", impact: 100, feedback: "销量平平。" }
                ]
            },
            {
                id: 29,
                text: "环保包装正在流行。",
                options: [
                    { text: "切换到绿色包装", type: "good", impact: 600, feedback: "因绿色形象销量上升！（利润 +600）" },
                    { text: "坚持使用塑料", type: "bad", impact: -200, feedback: "遭到抵制。" },
                    { text: "漂绿（撒谎）", type: "bad", impact: -1000, feedback: "被抓包撒谎。" }
                ]
            },
            {
                id: 30,
                text: "最后冲刺！年底了。",
                options: [
                    { text: "发起大规模活动", type: "good", impact: 1500, feedback: "巨大成功！完美收官。（利润 +1500）" },
                    { text: "提前放假", type: "bad", impact: -500, feedback: "错过了假日高峰。" },
                    { text: "标准时间", type: "neutral", impact: 200, feedback: "年底销售稳定。（利润 +200）" }
                ]
            }
        ],
        hiringRounds: [
            [ // Round 1: Assistant
                {
                    name: "Alex",
                    role: "助理",
                    type: "good",
                    cost: 500,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["工商管理文凭", "认证办公室经理"],
                    history: [
                        { role: "初级行政", company: "科技公司", duration: "2年" },
                        { role: "前台", company: "豪华酒店", duration: "1.5年" },
                        { role: "实习生", company: "创业公司", duration: "6个月" }
                    ],
                    profile: "我是一名组织能力强的专业人士，正在寻找长期机会，与充满活力的团队共同成长。"
                },
                {
                    name: "Ben",
                    role: "助理",
                    type: "bad",
                    cost: -200,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["高中毕业", "在线加密货币交易课程"],
                    history: [
                        { role: "行政", company: "A公司", duration: "2个月" },
                        { role: "服务员", company: "B咖啡馆", duration: "3个月" },
                        { role: "销售", company: "C商店", duration: "1个月" }
                    ],
                    profile: "我只是想找份工作付账单，同时搞我的副业。"
                },
                {
                    name: "Charlie",
                    role: "助理",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["高中毕业"],
                    history: [
                        { role: "店员", company: "零售店", duration: "4年" },
                        { role: "收银员", company: "超市", duration: "2年" },
                        { role: "学生", company: "学院", duration: "2年" }
                    ],
                    profile: "我是一名可靠的员工，准时上班，听从指挥。"
                }
            ],
            [ // Round 2: Marketer
                {
                    name: "Sarah",
                    role: "营销人员",
                    type: "good",
                    cost: 1000,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["市场营销学士", "谷歌分析认证"],
                    history: [
                        { role: "社交媒体经理", company: "BrandX", duration: "3年" },
                        { role: "内容创作者", company: "自由职业", duration: "2年" },
                        { role: "营销实习生", company: "Y代理", duration: "1年" }
                    ],
                    profile: "热衷于数据驱动的故事讲述和建立真实的社区参与。"
                },
                {
                    name: "Sam",
                    role: "营销人员",
                    type: "bad",
                    cost: -500,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["自学", "网红学院"],
                    history: [
                        { role: "品牌大使", company: "骗局币", duration: "3周" },
                        { role: "推广员", company: "Z俱乐部", duration: "2个月" },
                        { role: "无业", company: "-", duration: "6个月" }
                    ],
                    profile: "我能让东西病毒式传播。我不信规则，只看结果。#奋斗"
                },
                {
                    name: "Sid",
                    role: "营销人员",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["传播学学士"],
                    history: [
                        { role: "公关助理", company: "A公司", duration: "1年" },
                        { role: "作家", company: "B博客", duration: "1年" },
                        { role: "销售", company: "C商店", duration: "1年" }
                    ],
                    profile: "我有传播学学位，准备学习数字营销的诀窍。"
                }
            ],
            [ // Round 3: Manager
                {
                    name: "Mike",
                    role: "经理",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["MBA", "PMP认证"],
                    history: [
                        { role: "项目经理", company: "大公司", duration: "5年" },
                        { role: "分析师", company: "A银行", duration: "3年" },
                        { role: "顾问", company: "B公司", duration: "2年" }
                    ],
                    profile: "我相信严格遵守流程和协议以确保一致的结果。"
                },
                {
                    name: "Molly",
                    role: "经理",
                    type: "good",
                    cost: 2000,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["心理学学士", "领导力研讨会"],
                    history: [
                        { role: "团队组长", company: "科技初创", duration: "4年" },
                        { role: "人力资源专员", company: "人才公司", duration: "3年" },
                        { role: "招聘人员", company: "X代理", duration: "2年" }
                    ],
                    profile: "我的重点是赋能团队，培养创新和信任的文化。"
                },
                {
                    name: "Max",
                    role: "经理",
                    type: "bad",
                    cost: -1000,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["未列出"],
                    history: [
                        { role: "CEO", company: "失败初创1", duration: "1年" },
                        { role: "CEO", company: "失败初创2", duration: "8个月" },
                        { role: "经理", company: "爸爸的公司", duration: "6个月" }
                    ],
                    profile: "我是一个有远见的领导者，比其他人都懂。我只需要一个听话的团队。"
                }
            ],
            [ // Round 4: Tech Lead
                {
                    name: "Tina",
                    role: "技术主管",
                    type: "bad",
                    cost: -2000,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["训练营毕业（未完成）"],
                    history: [
                        { role: "CTO", company: "隐身模式", duration: "3个月" },
                        { role: "开发", company: "自由职业", duration: "1个月" },
                        { role: "实习生", company: "谷歌（1周）", duration: "1周" }
                    ],
                    profile: "我基本上是个天才。我可以在周末写出任何代码。相信我。"
                },
                {
                    name: "Tim",
                    role: "技术主管",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["计算机科学学士"],
                    history: [
                        { role: "开发人员", company: "软件公司", duration: "3年" },
                        { role: "初级开发", company: "Web代理", duration: "2年" },
                        { role: "支持", company: "IT公司", duration: "1年" }
                    ],
                    profile: "我编写干净、可维护的代码，比起实验性技术更喜欢稳定性。"
                },
                {
                    name: "Tess",
                    role: "技术主管",
                    type: "good",
                    cost: 3000,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["软件工程硕士", "AWS架构师"],
                    history: [
                        { role: "高级工程师", company: "独角兽公司", duration: "4年" },
                        { role: "DevOps", company: "云系统", duration: "2年" },
                        { role: "开发人员", company: "App工作室", duration: "2年" }
                    ],
                    profile: "我喜欢解决复杂问题并构建持久的可扩展系统。"
                }
            ],
            [ // Round 5: Partner
                {
                    name: "Pat",
                    role: "合伙人",
                    type: "good",
                    cost: 5000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["连续创业者", "哈佛MBA"],
                    history: [
                        { role: "创始人", company: "已出售公司", duration: "退出：$10M" },
                        { role: "销售副总裁", company: "全球公司", duration: "5年" },
                        { role: "董事会成员", company: "非营利组织", duration: "当前" }
                    ],
                    profile: "我带来资金、人脉和成功的退出记录。"
                },
                {
                    name: "Paul",
                    role: "合伙人",
                    type: "neutral",
                    cost: 1000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["继承财富"],
                    history: [
                        { role: "投资者", company: "多家", duration: "5年" },
                        { role: "学生", company: "艺术学校", duration: "4年" },
                        { role: "无", company: "间隔年", duration: "2年" }
                    ],
                    profile: "我有钱投资，我觉得你的生意看起来很有趣。"
                },
                {
                    name: "Pete",
                    role: "合伙人",
                    type: "bad",
                    cost: -5000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["社会大学"],
                    history: [
                        { role: "董事", company: "空壳公司", duration: "未知" },
                        { role: "交易员", company: "离岸公司", duration: "2年" },
                        { role: "顾问", company: "破产公司", duration: "1年" }
                    ],
                    profile: "我可以帮你洗... 我的意思是，高效管理你的利润。只收现金。"
                }
            ]
        ]
    },
    ko: {
        ui: {
            title: "BizSim <span class=\"accent\">타이쿤</span>",
            subtitle: "최고의 비즈니스 제국을 건설할 수 있습니까?",
            labelName: "사업체 이름",
            labelProduct: "주요 제품",
            labelFounder: "창립자 이름",
            btnStart: "여정 시작",
            labelProfit: "이익/손실",
            labelTurn: "턴",
            btnRoll: "판매 주사위 굴리기",
            btnContinue: "계속",
            btnRestart: "다시하기",
            reportTitle: "월간 판매 보고서",
            reportSubtitle: "시장의 반응을 확인할 시간입니다!",
            hiringTitle: "팀 확장",
            hiringSubtitle: "<span id=\"biz-name-span\"></span>에 합류할 새로운 팀원을 선택하세요",
            gameOver: "게임 오버!",
            finalProfit: "최종 이익",
            quals: "자격 요건",
            history: "경력",
            feedbackGood: "탁월한 선택!",
            feedbackBad: "저런!",
            feedbackNeutral: "좋습니다.",
            hired: "고용됨",
            rolled: "주사위 결과:",
            sales: "매출",
            market: "시장",
            shop: "상점",
            buy: "구매",
            owned: "보유 중",
            close: "닫기"
        },
        marketTrends: {
            boom: { label: "호황", desc: "경제가 호황입니다! 이익 x1.5" },
            stable: { label: "안정", desc: "시장이 안정적입니다. 정상 이익." },
            recession: { label: "불황", desc: "경제가 침체되었습니다. 이익 x0.5" },
            volatile: { label: "변동성", desc: "시장이 불안정합니다. 고위험!" }
        },
        roulette: {
            title: "시장 변동성!",
            desc: "시장이 불안정합니다! 룰렛을 돌려 운을 시험해보세요.",
            betRed: "레드에 베팅",
            betBlack: "블랙에 베팅",
            resultNum: "결과:",
            won: "당첨!",
            lost: "실패!",
            volatile: "변동성"
        },
        upgrades: [
            { id: "coffee", name: "커피 머신", cost: 500, multiplier: 0.1, desc: "+10% 이익 효율" },
            { id: "marketing", name: "마케팅 팀", cost: 1500, multiplier: 0.25, desc: "+25% 이익 효율" },
            { id: "ai", name: "AI 컨설턴트", cost: 3000, multiplier: 0.5, desc: "+50% 이익 효율" }
        ],
        rankings: {
            beginner: "초보자",
            vendor: "노점상",
            entrepreneur: "사업가",
            marketLeader: "시장 리더",
            billionaire: "억만장자"
        },
        feedback: {
            scenarios: {
                great: "비즈니스 감각이 타고나셨군요! 결정이 완벽했습니다.",
                good: "좋은 선택을 하셨지만, 개선할 여지가 있습니다.",
                bad: "험난한 여정이었습니다. 다음에는 전략을 다시 생각해보는 것이 좋겠습니다."
            },
            hiring: {
                great: "드림팀을 만들었습니다! 직원들이 성공을 이끌었습니다.",
                good: "팀은 괜찮았지만, 몇몇 부적절한 인원이 발목을 잡았습니다.",
                bad: "채용 과정에 개선이 필요합니다. 맞지 않는 인원이 너무 많습니다."
            }
        },
        scenarios: [
            {
                id: 1,
                text: "새로운 사업을 위한 로고가 필요합니다. 어떻게 하시겠습니까?",
                options: [
                    { text: "전문 디자이너 고용", type: "good", impact: 200, feedback: "훌륭한 브랜딩이 고수익 고객을 유치했습니다! (이익 +200)" },
                    { text: "냅킨에 직접 그리기", type: "bad", impact: -100, feedback: "전문적이지 않아 보입니다. 초기 매출을 잃었습니다." },
                    { text: "무료 온라인 생성기 사용", type: "neutral", impact: 50, feedback: "작동은 합니다. 작은 이익을 얻었습니다." }
                ]
            },
            {
                id: 2,
                text: "초기 재고를 구매해야 합니다. 어떤 품질을 선택하시겠습니까?",
                options: [
                    { text: "고품질, 고비용", type: "good", impact: 500, feedback: "고객들이 품질을 좋아합니다! 매출이 급증하고 있습니다. (이익 +500)" },
                    { text: "저렴하고 낮은 품질", type: "bad", impact: -200, feedback: "물건이 금방 고장납니다. 환불 비용이 발생하고 있습니다." },
                    { text: "중급 표준 상품", type: "neutral", impact: 100, feedback: "안정적인 판매. 안정적인 이익." }
                ]
            },
            {
                id: 3,
                text: "고객이 첫 주문에 대해 할인을 요청합니다.",
                options: [
                    { text: "정중하게 거절", type: "neutral", impact: 100, feedback: "그래도 구매했습니다. 마진 유지." },
                    { text: "10% 소액 할인 제공", type: "good", impact: 300, feedback: "친구 3명을 추천했습니다! 판매량 증가. (이익 +300)" },
                    { text: "홍보를 위해 무료 제공", type: "bad", impact: -100, feedback: "무료만 챙기고 사라졌습니다." }
                ]
            },
            {
                id: 4,
                text: "출시 당일 인터넷이 끊겼습니다!",
                options: [
                    { text: "당황해서 하루 쉬기", type: "bad", impact: -200, feedback: "하루 매출을 잃었습니다." },
                    { text: "휴대폰 핫스팟 사용", type: "good", impact: 150, feedback: "주문 처리를 계속했습니다! (이익 +150)" },
                    { text: "카페로 가기", type: "neutral", impact: 0, feedback: "커피 값을 내고 본전치기 했습니다." }
                ]
            },
            {
                id: 5,
                text: "지역 인플루언서가 유료 홍보를 제안합니다.",
                options: [
                    { text: "500 RM 지불", type: "good", impact: 1000, feedback: "게시물이 입소문을 탔습니다! 엄청난 ROI. (이익 +1000)" },
                    { text: "무시하기", type: "neutral", impact: 0, feedback: "매출 변화 없음." },
                    { text: "요구한 것을 모욕하기", type: "bad", impact: -300, feedback: "그들이 비난 영상을 올렸습니다. 고객을 잃었습니다." }
                ]
            },
            {
                id: 6,
                text: "정리해야 할 서류 더미가 있습니다.",
                options: [
                    { text: "주말 내내 하기", type: "good", impact: 200, feedback: "현금화하지 않은 수표를 발견했습니다! (이익 +200)" },
                    { text: "서랍에 처박아두기", type: "bad", impact: -300, feedback: "세금 납부 기한을 놓쳤습니다. 벌금 부과." },
                    { text: "일일 임시직 고용", type: "neutral", impact: 0, feedback: "비용은 들었지만 시간은 절약했습니다. 본전." }
                ]
            },
            {
                id: 7,
                text: "경쟁자가 당신의 제품 아이디어를 베꼈습니다.",
                options: [
                    { text: "즉시 고소하기", type: "bad", impact: -1000, feedback: "법률 비용으로 계좌가 바닥났습니다." },
                    { text: "혁신하고 개선하기", type: "good", impact: 800, feedback: "새로운 버전이 그들을 압도했습니다. (이익 +800)" },
                    { text: "무시하기", type: "neutral", impact: 0, feedback: "시장 점유율이 나뉘었습니다." }
                ]
            },
            {
                id: 8,
                text: "고객이 별 1개 리뷰를 남겼습니다.",
                options: [
                    { text: "화내며 답글 달기", type: "bad", impact: -200, feedback: "잠재 고객들이 겁을 먹고 도망갔습니다." },
                    { text: "사과하고 해결책 제시", type: "good", impact: 100, feedback: "별 5개로 수정했습니다! 매출 회복. (이익 +100)" },
                    { text: "리뷰 삭제하기", type: "neutral", impact: 0, feedback: "여전히 묻혀서 남아있습니다." }
                ]
            },
            {
                id: 9,
                text: "공급업체가 가격을 20% 인상했습니다.",
                options: [
                    { text: "더 싸고 나쁜 곳으로 변경", type: "bad", impact: -500, feedback: "품질 하락, 반품 급증." },
                    { text: "인상폭 협상", type: "good", impact: 200, feedback: "마진과 품질을 유지했습니다. (이익 +200)" },
                    { text: "비용 감수", type: "neutral", impact: -100, feedback: "단위당 이익 감소." }
                ]
            },
            {
                id: 10,
                text: "광고를 해야 합니다.",
                options: [
                    { text: "소셜 미디어 광고", type: "good", impact: 1500, feedback: "타겟 광고가 완벽하게 적중했습니다! (이익 +1500)" },
                    { text: "차량 전단지", type: "bad", impact: -200, feedback: "비에 젖어 망가졌습니다. 돈 낭비." },
                    { text: "지역 신문", type: "neutral", impact: 100, feedback: "매출 소폭 상승." }
                ]
            },
            {
                id: 11,
                text: "장비 고장! 메인 컴퓨터가 죽었습니다.",
                options: [
                    { text: "최신 최고 사양 구매", type: "good", impact: 500, feedback: "생산성 2배! 본전 뽑았습니다. (이익 +500)" },
                    { text: "중고 구매", type: "neutral", impact: 0, feedback: "업무 복귀. 이득도 손실도 없음." },
                    { text: "직접 수리 시도", type: "bad", impact: -300, feedback: "더 망가뜨렸습니다. 결국 새 것을 사야 했습니다." }
                ]
            },
            {
                id: 12,
                text: "번아웃이 온 것 같습니다.",
                options: [
                    { text: "휴가 가기", type: "neutral", impact: -200, feedback: "돈은 썼지만 휴식을 취했습니다." },
                    { text: "참고 계속하기", type: "bad", impact: -500, feedback: "피로로 인해 비싼 실수를 저질렀습니다." },
                    { text: "업무 위임 및 주말 휴식", type: "good", impact: 300, feedback: "팀이 나섰고 당신은 회복했습니다. 효율성 상승! (이익 +300)" }
                ]
            },
            {
                id: 13,
                text: "큰 명절이 다가옵니다.",
                options: [
                    { text: "테마 세일 진행", type: "good", impact: 2000, feedback: "엄청난 물량! 최고의 달. (이익 +2000)" },
                    { text: "아무것도 안 함", type: "neutral", impact: 100, feedback: "평범한 명절 매출." },
                    { text: "가격 인상", type: "bad", impact: -500, feedback: "고객들이 경쟁사로 갔습니다." }
                ]
            },
            {
                id: 14,
                text: "세금 신고 기간입니다.",
                options: [
                    { text: "회계사 고용", type: "good", impact: 500, feedback: "큰 환급금을 찾아냈습니다! (이익 +500)" },
                    { text: "막판에 직접 하기", type: "bad", impact: -1000, feedback: "오류로 인해 벌금 부과." },
                    { text: "소프트웨어 사용", type: "neutral", impact: 0, feedback: "정확하게 신고함. 문제 없음." }
                ]
            },
            {
                id: 15,
                text: "투자자가 회사 지분 50%에 대한 투자를 제안합니다.",
                options: [
                    { text: "즉시 수락", type: "bad", impact: 500, feedback: "현금은 얻었지만 지분을 너무 싸게 팔았습니다. (이익 +500)" },
                    { text: "정중히 거절", type: "good", impact: 1000, feedback: "이익의 100%를 지켰습니다! 유기적 성장. (이익 +1000)" },
                    { text: "10%로 협상", type: "neutral", impact: 800, feedback: "좋은 균형. (이익 +800)" }
                ]
            },
            {
                id: 16,
                text: "세일 기간 중 웹사이트가 다운되었습니다.",
                options: [
                    { text: "호스팅 플랜 업그레이드", type: "good", impact: 400, feedback: "사이트가 그 어느 때보다 빠릅니다. 매출 상승! (이익 +400)" },
                    { text: "인터넷 제공업체 탓하기", type: "bad", impact: -200, feedback: "고객들이 떠났습니다." },
                    { text: "기다리기", type: "neutral", impact: -100, feedback: "일부 매출 손실." }
                ]
            },
            {
                id: 17,
                text: "이번 달에 여유 자금이 생겼습니다.",
                options: [
                    { text: "R&D에 재투자", type: "good", impact: 1500, feedback: "새로운 제품 기능이 대박 났습니다! (이익 +1500)" },
                    { text: "고급 의자 구매", type: "neutral", impact: -200, feedback: "편안하지만 돈이 들었습니다." },
                    { text: "파티 열기", type: "bad", impact: -500, feedback: "재밌었지만 비쌌습니다." }
                ]
            },
            {
                id: 18,
                text: "고객이 사용한 제품을 반품하고 싶어합니다.",
                options: [
                    { text: "평화를 위해 수락", type: "neutral", impact: -50, feedback: "작은 손실." },
                    { text: "정책을 들어 거절", type: "bad", impact: -100, feedback: "나쁜 리뷰." },
                    { text: "스토어 크레딧 제공", type: "good", impact: 200, feedback: "그들이 더 많은 물건을 샀습니다! (이익 +200)" }
                ]
            },
            {
                id: 19,
                text: "지역 자선단체가 기부를 요청합니다.",
                options: [
                    { text: "500 RM 기부", type: "good", impact: 300, feedback: "좋은 홍보! 지역사회가 보답했습니다. (이익 +300)" },
                    { text: "거절하기", type: "neutral", impact: 0, feedback: "현금 절약." },
                    { text: "유통기한 지난 제품 기부", type: "bad", impact: -500, feedback: "홍보 대참사." }
                ]
            },
            {
                id: 20,
                text: "주문을 더 빨리 배송해야 합니다.",
                options: [
                    { text: "물류 회사 고용", type: "good", impact: 600, feedback: "고객들이 속도를 좋아합니다. 재주문! (이익 +600)" },
                    { text: "직접 운전하기", type: "neutral", impact: 0, feedback: "돈은 아꼈지만 시간 낭비." },
                    { text: "고객 기다리게 하기", type: "bad", impact: -300, feedback: "주문 취소." }
                ]
            },
            {
                id: 21,
                text: "새로운 소셜 미디어 트렌드가 뜨고 있습니다.",
                options: [
                    { text: "트렌드에 편승하기", type: "good", impact: 1000, feedback: "바이럴 히트! 매출 폭발. (이익 +1000)" },
                    { text: "유치하다고 무시하기", type: "neutral", impact: 0, feedback: "기회를 놓쳤습니다." },
                    { text: "트렌드 조롱하기", type: "bad", impact: -200, feedback: "역풍." }
                ]
            },
            {
                id: 22,
                text: "사무실 임대료가 오르고 있습니다.",
                options: [
                    { text: "더 싼 곳으로 이사", type: "neutral", impact: 100, feedback: "조금 절약했습니다." },
                    { text: "원격/재택 근무 전환", type: "good", impact: 800, feedback: "임대료를 크게 절약했습니다! (이익 +800)" },
                    { text: "남아서 지불하기", type: "bad", impact: -500, feedback: "이익 감소." }
                ]
            },
            {
                id: 23,
                text: "더 저렴한 자재 공급업체를 찾았습니다.",
                options: [
                    { text: "즉시 변경", type: "bad", impact: -1000, feedback: "품질이 끔찍했습니다. 리콜." },
                    { text: "샘플 먼저 테스트", type: "good", impact: 400, feedback: "좋은 균형을 찾았습니다. 마진 상승. (이익 +400)" },
                    { text: "현재 업체 유지", type: "neutral", impact: 0, feedback: "현상 유지." }
                ]
            },
            {
                id: 24,
                text: "직원이 계속 지각합니다.",
                options: [
                    { text: "즉시 해고", type: "bad", impact: -800, feedback: "소송 위험." },
                    { text: "건설적인 대화 나누기", type: "good", impact: 300, feedback: "그들이 개선되었고 더 많이 팔았습니다! (이익 +300)" },
                    { text: "무시하기", type: "neutral", impact: -100, feedback: "생산성 저하." }
                ]
            },
            {
                id: 25,
                text: "새로운 국가로 수출할 기회가 생겼습니다.",
                options: [
                    { text: "도전하기!", type: "good", impact: 3000, feedback: "대성공! 해외 매출. (이익 +3000)" },
                    { text: "너무 위험함", type: "neutral", impact: 0, feedback: "안전하게 감." },
                    { text: "조사 없이 진행", type: "bad", impact: -2000, feedback: "세관 문제. 물건 분실." }
                ]
            },
            {
                id: 26,
                text: "데이터 유출! 고객 이메일이 노출되었습니다.",
                options: [
                    { text: "숨기기", type: "bad", impact: -1000, feedback: "신뢰 파괴." },
                    { text: "고객에게 알리고 수정", type: "good", impact: -50, feedback: "비용은 들었지만 평판은 지켰습니다. (손실 -50)" },
                    { text: "해커 탓하기", type: "neutral", impact: -500, feedback: "사람들이 의심합니다." }
                ]
            },
            {
                id: 27,
                text: "경쟁사가 당신의 사업을 인수하겠다고 제안합니다.",
                options: [
                    { text: "낮은 가격에 판매", type: "bad", impact: 1000, feedback: "너무 싸게 팔았습니다. (이익 +1000)" },
                    { text: "거절하기", type: "neutral", impact: 0, feedback: "계속 사업 유지." },
                    { text: "더 좋은 제안 기다리기", type: "good", impact: 3000, feedback: "가치 상승! (이익 +3000)" }
                ]
            },
            {
                id: 28,
                text: "두 번째 제품을 출시하고 싶습니다.",
                options: [
                    { text: "서둘러 출시", type: "bad", impact: -500, feedback: "실패." },
                    { text: "시장 조사 먼저 하기", type: "good", impact: 1200, feedback: "베스트셀러! (이익 +1200)" },
                    { text: "첫 번째 제품 복제", type: "neutral", impact: 100, feedback: "적은 매출." }
                ]
            },
            {
                id: 29,
                text: "친환경 포장이 유행입니다.",
                options: [
                    { text: "친환경 포장으로 전환", type: "good", impact: 600, feedback: "친환경 이미지로 매출 상승! (이익 +600)" },
                    { text: "플라스틱 고수", type: "bad", impact: -200, feedback: "불매 운동." },
                    { text: "그린워싱 (거짓말하기)", type: "bad", impact: -1000, feedback: "거짓말 들통남." }
                ]
            },
            {
                id: 30,
                text: "마지막 스퍼트! 연말입니다.",
                options: [
                    { text: "대규모 캠페인 시작", type: "good", impact: 1500, feedback: "대성공! 강력한 마무리. (이익 +1500)" },
                    { text: "휴일을 위해 일찍 닫기", type: "bad", impact: -500, feedback: "연말 특수 놓침." },
                    { text: "표준 운영 시간", type: "neutral", impact: 200, feedback: "안정적인 연말 매출. (이익 +200)" }
                ]
            }
        ],
        hiringRounds: [
            [ // Round 1: Assistant
                {
                    name: "Alex",
                    role: "비서",
                    type: "good",
                    cost: 500,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["경영학 디플로마", "공인 사무 관리자"],
                    history: [
                        { role: "주니어 관리", company: "TechCorp", duration: "2년" },
                        { role: "접수원", company: "호텔 럭스", duration: "1.5년" },
                        { role: "인턴", company: "스타트업 Inc", duration: "6개월" }
                    ],
                    profile: "저는 역동적인 팀과 함께 성장할 장기적인 기회를 찾고 있는 체계적인 전문가입니다."
                },
                {
                    name: "Ben",
                    role: "비서",
                    type: "bad",
                    cost: -200,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["고등학교 졸업", "온라인 암호화폐 거래 과정"],
                    history: [
                        { role: "관리", company: "A사", duration: "2개월" },
                        { role: "서버", company: "B카페", duration: "3개월" },
                        { role: "영업", company: "C상점", duration: "1개월" }
                    ],
                    profile: "부업을 하는 동안 생활비를 벌 수 있는 일을 찾고 있습니다."
                },
                {
                    name: "Charlie",
                    role: "비서",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_assistant_1763947749484.png",
                    qualifications: ["고등학교 졸업"],
                    history: [
                        { role: "점원", company: "소매점", duration: "4년" },
                        { role: "계산원", company: "슈퍼마켓", duration: "2년" },
                        { role: "학생", company: "대학", duration: "2년" }
                    ],
                    profile: "저는 시간을 엄수하고 시키는 일을 하는 성실한 일꾼입니다."
                }
            ],
            [ // Round 2: Marketer
                {
                    name: "Sarah",
                    role: "마케터",
                    type: "good",
                    cost: 1000,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["마케팅 학사", "Google Analytics 인증"],
                    history: [
                        { role: "소셜 미디어 관리", company: "BrandX", duration: "3년" },
                        { role: "콘텐츠 크리에이터", company: "프리랜서", duration: "2년" },
                        { role: "마케팅 인턴", company: "Y에이전시", duration: "1년" }
                    ],
                    profile: "데이터 기반 스토리텔링과 진정한 커뮤니티 참여 구축에 열정적입니다."
                },
                {
                    name: "Sam",
                    role: "마케터",
                    type: "bad",
                    cost: -500,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["독학", "인플루언서 아카데미"],
                    history: [
                        { role: "브랜드 앰배서더", company: "스캠코인", duration: "3주" },
                        { role: "프로모터", company: "Z클럽", duration: "2개월" },
                        { role: "무직", company: "-", duration: "6개월" }
                    ],
                    profile: "저는 바이럴을 만듭니다. 규칙은 믿지 않습니다. 오직 결과뿐. #Hustle"
                },
                {
                    name: "Sid",
                    role: "마케터",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_marketer_1763947761982.png",
                    qualifications: ["커뮤니케이션 학사"],
                    history: [
                        { role: "홍보 보조", company: "A사", duration: "1년" },
                        { role: "작가", company: "B블로그", duration: "1년" },
                        { role: "영업", company: "C상점", duration: "1년" }
                    ],
                    profile: "커뮤니케이션 학위가 있으며 디지털 마케팅의 요령을 배울 준비가 되었습니다."
                }
            ],
            [ // Round 3: Manager
                {
                    name: "Mike",
                    role: "매니저",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["MBA", "PMP 인증"],
                    history: [
                        { role: "프로젝트 관리", company: "대기업", duration: "5년" },
                        { role: "분석가", company: "A은행", duration: "3년" },
                        { role: "컨설턴트", company: "B사", duration: "2년" }
                    ],
                    profile: "일관된 결과를 보장하기 위해 프로세스와 프로토콜을 엄격히 준수한다고 믿습니다."
                },
                {
                    name: "Molly",
                    role: "매니저",
                    type: "good",
                    cost: 2000,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["심리학 학사", "리더십 워크숍"],
                    history: [
                        { role: "팀 리더", company: "테크스타트업", duration: "4년" },
                        { role: "HR 전문가", company: "피플코", duration: "3년" },
                        { role: "리크루터", company: "X에이전시", duration: "2년" }
                    ],
                    profile: "저의 초점은 팀에 권한을 부여하고 혁신과 신뢰의 문화를 조성하는 것입니다."
                },
                {
                    name: "Max",
                    role: "매니저",
                    type: "bad",
                    cost: -1000,
                    avatar: "assets/avatar_manager_1763947774893.png",
                    qualifications: ["기재 없음"],
                    history: [
                        { role: "CEO", company: "실패한 스타트업 1", duration: "1년" },
                        { role: "CEO", company: "실패한 스타트업 2", duration: "8개월" },
                        { role: "매니저", company: "아빠 회사", duration: "6개월" }
                    ],
                    profile: "저는 누구보다 잘 아는 비전 있는 리더입니다. 제 말을 듣는 팀만 있으면 됩니다."
                }
            ],
            [ // Round 4: Tech Lead
                {
                    name: "Tina",
                    role: "기술 리드",
                    type: "bad",
                    cost: -2000,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["부트캠프 졸업 (미수료)"],
                    history: [
                        { role: "CTO", company: "스텔스 모드", duration: "3개월" },
                        { role: "개발자", company: "프리랜서", duration: "1개월" },
                        { role: "인턴", company: "구글 (1주)", duration: "1주" }
                    ],
                    profile: "저는 천재입니다. 주말이면 뭐든 코딩할 수 있죠. 믿으세요."
                },
                {
                    name: "Tim",
                    role: "기술 리드",
                    type: "neutral",
                    cost: 0,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["컴퓨터 공학 학사"],
                    history: [
                        { role: "개발자", company: "소프트코", duration: "3년" },
                        { role: "주니어 개발", company: "웹에이전시", duration: "2년" },
                        { role: "지원", company: "IT 회사", duration: "1년" }
                    ],
                    profile: "저는 깨끗하고 유지 관리 가능한 코드를 작성하며 실험적인 기술보다 안정성을 선호합니다."
                },
                {
                    name: "Tess",
                    role: "기술 리드",
                    type: "good",
                    cost: 3000,
                    avatar: "assets/avatar_tech_1763947789208.png",
                    qualifications: ["소프트웨어 공학 석사", "AWS 아키텍트"],
                    history: [
                        { role: "수석 엔지니어", company: "유니콘 Inc", duration: "4년" },
                        { role: "DevOps", company: "클라우드시스", duration: "2년" },
                        { role: "개발자", company: "앱스튜디오", duration: "2년" }
                    ],
                    profile: "저는 복잡한 문제를 해결하고 지속 가능한 확장 가능한 시스템을 구축하는 것을 좋아합니다."
                }
            ],
            [ // Round 5: Partner
                {
                    name: "Pat",
                    role: "파트너",
                    type: "good",
                    cost: 5000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["연쇄 창업가", "하버드 MBA"],
                    history: [
                        { role: "창립자", company: "매각된 회사", duration: "엑시트: $10M" },
                        { role: "영업 부사장", company: "글로벌 기업", duration: "5년" },
                        { role: "이사회 멤버", company: "비영리 단체", duration: "현재" }
                    ],
                    profile: "저는 자본, 인맥, 그리고 성공적인 엑시트 기록을 가져옵니다."
                },
                {
                    name: "Paul",
                    role: "파트너",
                    type: "neutral",
                    cost: 1000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["상속받은 부"],
                    history: [
                        { role: "투자자", company: "다수", duration: "5년" },
                        { role: "학생", company: "예술 학교", duration: "4년" },
                        { role: "없음", company: "갭 이어", duration: "2년" }
                    ],
                    profile: "투자할 돈이 있고 당신의 사업이 재미있어 보입니다."
                },
                {
                    name: "Pete",
                    role: "파트너",
                    type: "bad",
                    cost: -5000,
                    avatar: "assets/avatar_partner_1763949067415.png",
                    qualifications: ["인생 학교"],
                    history: [
                        { role: "이사", company: "유령 회사", duration: "알 수 없음" },
                        { role: "트레이더", company: "역외 회사", duration: "2년" },
                        { role: "컨설턴트", company: "파산한 회사", duration: "1년" }
                    ],
                    profile: "제가 세탁... 아니, 이익을 효율적으로 관리하도록 도와드릴 수 있습니다. 현금만 받습니다."
                }
            ]
        ]
    }
};

// Helper to fill in missing translations with English fallback
// This ensures the game doesn't crash if I haven't translated everything yet.
function fillFallbacks() {
    const en = translations.en;
    ['zh', 'ko'].forEach(lang => {
        // Fill Scenarios
        if (!translations[lang].scenarios) translations[lang].scenarios = [];
        for (let i = 0; i < en.scenarios.length; i++) {
            if (!translations[lang].scenarios[i]) {
                translations[lang].scenarios[i] = en.scenarios[i];
            }
        }
        // Fill Hiring
        if (!translations[lang].hiringRounds || translations[lang].hiringRounds.length === 0) {
            translations[lang].hiringRounds = en.hiringRounds;
        }
    });
}
fillFallbacks();

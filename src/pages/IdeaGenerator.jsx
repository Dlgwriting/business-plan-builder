import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Sparkles, Lightbulb, ArrowRight, ChefHat, TreePine, Palette, Gamepad2, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const questions = [
    {
        id: 'interest',
        question: "What are you most interested in?",
        options: [
            { value: 'food', label: 'Food & Cooking', icon: '🍳' },
            { value: 'tech', label: 'Technology & Gaming', icon: '💻' },
            { value: 'art', label: 'Art & Design', icon: '🎨' },
            { value: 'service', label: 'Helping Others', icon: '🤝' },
        ]
    },

    {
        id: 'time',
        question: "When can you work on this?",
        options: [
            { value: 'weekend', label: 'Weekends Only' },
            { value: 'afterschool', label: 'After School' },
            { value: 'holiday', label: 'School Holidays' },
        ]
    }
];

const ideas = {
    food: {
        low: [
            { title: "Lemonade/Drink Stand", desc: "Sell refreshing drinks in your neighborhood." },
            { title: "Sandwich Delivery", desc: "Make simple sandwiches for neighbors." }
        ],
        medium: [
            { title: "Nasi Lemak Packs", desc: "Sell pre-packed Nasi Lemak in the morning." },
            { title: "Baking Cookies", desc: "Bake and sell cookies to friends and family." }
        ],
        high: [
            { title: "Pop-up Food Stall", desc: "Rent a small booth at a local market." }
        ]
    },
    tech: {
        low: [
            { title: "Tech Support for Seniors", desc: "Help older people with their phones and computers." },
            { title: "Game Coaching", desc: "Teach others how to play games better." }
        ],
        medium: [
            { title: "Website Building", desc: "Create simple websites for local shops." }
        ],
        high: [
            { title: "App Development", desc: "Build a simple mobile app." }
        ]
    },
    art: {
        low: [
            { title: "Handmade Cards", desc: "Draw and sell greeting cards." },
            { title: "Digital Art Commissions", desc: "Draw characters for people online." }
        ],
        medium: [
            { title: "T-Shirt Design", desc: "Design and print your own t-shirts." },
            { title: "Jewelry Making", desc: "Make bracelets and necklaces." }
        ],
        high: [
            { title: "Craft Stall", desc: "Sell your crafts at a local bazaar." }
        ]
    },
    service: {
        low: [
            { title: "Pet Sitting", desc: "Take care of neighbors' pets." },
            { title: "Car Washing", desc: "Wash cars in your neighborhood." }
        ],
        medium: [
            { title: "Tutoring", desc: "Teach younger kids subjects you are good at." }
        ],
        high: [
            { title: "Event Planning", desc: "Help plan birthday parties for kids." }
        ]
    }
};

const IdeaGenerator = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const navigate = useNavigate();
    const { t } = useLanguage();
    const [selectedInterest, setSelectedInterest] = useState(null);
    const [generatedIdea, setGeneratedIdea] = useState(null);

    const interests = [
        { id: 'cooking', label: t('ideaGenerator.options.cooking'), icon: ChefHat, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
        { id: 'outdoors', label: t('ideaGenerator.options.outdoors'), icon: TreePine, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' },
        { id: 'creative', label: t('ideaGenerator.options.creative'), icon: Palette, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
        { id: 'tech', label: t('ideaGenerator.options.tech'), icon: Gamepad2, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
        { id: 'helping', label: t('ideaGenerator.options.helping'), icon: Heart, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    ];

    const generateResult = () => {
        const ideas = {
            cooking: ["Lemonade Stand", "Cookie Baker", "Sandwich Shop", "Fruit Skewers", "Popcorn Stall"],
            outdoors: ["Car Wash", "Dog Walking", "Gardening Helper", "Leaf Raking", "Bike Cleaning"],
            creative: ["Greeting Cards", "Friendship Bracelets", "Custom T-Shirts", "Painted Rocks", "Origami Crafts"],
            tech: ["Tech Tutor for Seniors", "Video Game Coach", "Website Builder", "Digital Photo Organizer", "Social Media Helper"],
            helping: ["Errand Runner", "Mother's Helper", "Tutor", "Pet Feeding", "Plant Watering"]
        };

        const categoryIdeas = ideas[selectedInterest];
        let newIdea;

        if (generatedIdea) {
            const availableIdeas = categoryIdeas.filter(idea => idea !== generatedIdea);
            if (availableIdeas.length > 0) {
                newIdea = availableIdeas[Math.floor(Math.random() * availableIdeas.length)];
            } else {
                newIdea = categoryIdeas[Math.floor(Math.random() * categoryIdeas.length)];
            }
        } else {
            newIdea = categoryIdeas[Math.floor(Math.random() * categoryIdeas.length)];
        }

        setGeneratedIdea(newIdea);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
                    <Lightbulb className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('ideaGenerator.title')}</h2>
                <p className="text-slate-600">{t('ideaGenerator.question')}</p>
            </motion.div>

            {!generatedIdea ? (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {interests.map((interest) => (
                            <motion.button
                                key={interest.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedInterest(interest.id)}
                                className={`p-4 rounded-xl border-2 text-left flex items-center transition-all ${selectedInterest === interest.id
                                    ? `border-blue-500 ring-2 ring-blue-200 bg-white`
                                    : `border-slate-100 hover:border-blue-200 bg-white`
                                    }`}
                            >
                                <div className={`w-10 h-10 ${interest.bg} rounded-lg flex items-center justify-center mr-4`}>
                                    <interest.icon className={`w-6 h-6 ${interest.color}`} />
                                </div>
                                <span className={`font-bold ${selectedInterest === interest.id ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {interest.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    <button
                        onClick={generateResult}
                        disabled={!selectedInterest}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center ${selectedInterest
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-200'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        {t('ideaGenerator.generate')} <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            ) : (
                <motion.div
                    key={generatedIdea} // Force re-render animation
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center"
                >
                    <h3 className="text-slate-500 font-medium mb-4 uppercase tracking-wide text-sm">{t('ideaGenerator.resultTitle')}</h3>
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
                        {generatedIdea}
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate(`/build?idea=${encodeURIComponent(generatedIdea)}`)}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            {t('ideaGenerator.buildPlan')} <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                        <button
                            onClick={generateResult}
                            className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-medium hover:bg-slate-100 transition-colors"
                        >
                            {t('ideaGenerator.tryAgain')}
                        </button>
                        <button
                            onClick={() => { setGeneratedIdea(null); setSelectedInterest(null); }}
                            className="text-sm text-slate-400 hover:text-slate-600 mt-2"
                        >
                            Change Category
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default IdeaGenerator;
